import React from 'react';

 class ListActions extends React.Component {
  render() {
    return (
      <div className="list-actions">
        <div className="action-right">
          <button aria-label="Move all right" className="move move-right"
            title="Move all right" type="button" onClick={this.props.ItemsMoveAllRight}>
            <span className="fa fa-chevron-right"></span>
            <span className="fa fa-chevron-right"></span>
          </button><button aria-label="Move right" className="move move-right"
            title="Move right" type="button" onClick={this.props.ItemsMoveRight}>
            <span className="fa fa-chevron-right"></span>
          </button>
        </div>
        <div className="action-left">
          <button aria-label="Move left" className="move move-left"
            title="Move left" type="button" onClick={this.props.ItemsMoveLeft}>
            <span className="fa fa-chevron-left"></span></button>
          <button aria-label="Move all left" className="move move-left"

            title="Move all left" type="button" onClick={this.props.ItemsMoveAllLeft}>
            <span className="fa fa-chevron-left"></span>
            <span className="fa fa-chevron-left"></span></button></div>
      </div>
    );
  }
}

export default ListActions;