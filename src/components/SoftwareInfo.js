import React from 'react';
import { connect } from "react-redux";
import * as configurationActions from "../actions/configuration";
import ListBox from './ListBox';
import ListActions from './ListActions';

class SoftwareInfo extends React.Component {

  createSoftwareGroupUI() {
    return   this.props.serverGroups.map((el, i) => (
     
      <div key={i} className="dual-list-box">
      <label className="mr-md-3">{el.serverGroupName || ''}</label>
        <div className="list-box list-box-available">  
          <ListBox Items={el.softwares.availableSoftwares}
          className="mr-md-3"
            name='softwares'
            valuePropertyName='id'
            selectedValue={el.softwares.selectedAvailableSoftwares}
            placeholder='Please select a make...'
            textPropertyName='name'
            OnSelect={(value) => this.props.selectAvailableSoftware(i,value)} />
        </div>
        <div>
          <ListActions 
            ItemsMoveAllRight={() => this.props.softwareItemsMoveAllRight(i)}
            ItemsMoveRight={() => this.props.softwareItemsMoveRight(i)}
            ItemsMoveLeft={() => this.props.softwareItemsMoveLeft(i)}
            ItemsMoveAllLeft={() => this.props.softwareItemsMoveAllLeft(i)}
          />

        </div>
        <div className="list-box list-box-selecte">
          <ListBox Items={el.softwares.choosenSoftwares}
            name='softwares'
            valuePropertyName='id'
            selectedValue={el.softwares.selectedChoosenSoftwares}
            textPropertyName='name'
            OnSelect={(value) => this.props.selectChoosenSoftware(i,value)} />
        </div>

      </div>
    ));
  }
  render() {
    if (this.props.currentStep !== 3) {
      return null
    }
    return (
      <div className="ui form mt-md-3">
        <h4 className="ui dividing header">Software Information</h4>

        <div className="fields">
          <div className="twelve wide field">
            {this.createSoftwareGroupUI()}

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ configuration }) => {
  return configuration;
};

export default connect(
  mapStateToProps,
  {
    ...configurationActions,
  }
)(SoftwareInfo);

