const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const ipc = electron.ipcMain;
const isDev = require('electron-is-dev');
const powershell = require('node-powershell');
const fs = require("fs");
const md5 = require('md5');
require('log-timestamp');

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

ipc.on("configuration:get", () => {
  //to do read from file and restore
  const INITIAL_STATE = {
    loading: true,
    currentStep: 1,
    fpmVersion: '',
    clientName: '',
    environmentName: '',
    nexusPath: '',
    nexusCred: '',
    deploymentDestination: '',
    noOfServerGroups: '',
    noOfServers: '',
    serverGroups: [],
    servers: [],
    deploymentType: '',
    fnAccountName: '',
    fnCredentials: '',
    scriptExecutionStatus: '',
    scriptExecutionMessage: '',
    errors: {
      fpmVersion: '',
      clientName: '',
      nexusPath: '',
    }
  };
  mainWindow.webContents.send("configuration:list", INITIAL_STATE);
});

ipc.on("scriptExecution:start", (event, configData) => {
  // convert JSON object to string
  const data = JSON.stringify(configData);
  let executionResult = { status: '', message: '' }
  try {
    fs.writeFileSync('output/config.json', data);
    executionResult.status = 'INPROGRESS';
    executionResult.message = 'Config File Write Successful';
    watchForLogFileChanges();
    mainWindow.webContents.send("scriptExecution:status", executionResult);
  } catch (error) {
    executionResult.status = 'ERRORRED';
    executionResult.message = 'Config File Write Errored' + error;
    mainWindow.webContents.send("scriptExecution:status", executionResult);
  }
});


ipc.on("scripts:get", (event) => {
  const scriptPath = path.join(__dirname, "data", "ScriptData.json");

  fs.readFile(scriptPath, (err, data) => {
    if (err) throw err;
    const scriptResponse = JSON.parse(data)['results'];
    mainWindow.webContents.send("scripts:list", scriptResponse);
  });
});

ipc.on('exec-shellscript', function (event, data) {
  mainWindow.webContents.send("script:execution:inprogress", data);
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

function watchForLogFileChanges() {
  const scriptLogFile = 'output/log.json';

  console.log(`Watching for file changes on ${scriptLogFile}`);

  let md5Previous = null;

  fs.watch(scriptLogFile, (event, filename) => {
    if (filename) {
      const md5Current = md5(fs.readFileSync(scriptLogFile));
      if (md5Current === md5Previous) {
        return;
      }
      md5Previous = md5Current;
      console.log(`${filename} file Changed`);
      readLogFile();
    }
  });
}

function readLogFile() {
  const scriptLogFilePath = 'output/log.json';
  fs.readFile(scriptLogFilePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {
      console.log('received data: ' + data);
    } else {
      console.log(err);
    }
  });
}
