const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const ipc = electron.ipcMain;
const isDev = require('electron-is-dev');
const powershell = require('node-powershell');
const fs = require("fs");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900, height: 680, webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js'
    }
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipc.on("scripts:get", (event) => {
  const scriptPath = path.join(__dirname,"data","ScriptData.json");

  fs.readFile(scriptPath, (err, data) => {
    if (err) throw err;
    const scriptResponse = JSON.parse(data)['results'];
    mainWindow.webContents.send("scripts:list",scriptResponse);
  });
});

ipc.on('exec-shellscript', function (event, data) {
  mainWindow.webContents.send("script:execution:inprogress",data);
  // Create the PS Instance
  let ps = new powershell({
    executionPolicy: 'Bypass',
    noProfile: true
  });

  ps.addCommand(data.path)
    .then(() => ps.addParameters([
      data.params.map(parm => {
        return `{${parm.paramName} : ${parm.paramValue}},`
      })
    ]));
   
  ps.invoke()
    .then(output => {
      const responseop = {
        ...data,
        output: output
      };
      mainWindow.webContents.send("scriptResults", responseop);
    })
    .catch(err => {
      console.error(err);
      const responseop = {
        ...data,
        output: err
      };
      mainWindow.webContents.send('scriptResults', responseop);
      ps.dispose()
    })


});

