import React from 'react';
import ListBoxItem from './ListBoxItem';

class ListBox extends React.Component {
  constructor(props) {
    super(props);

    this.valuePropertyName = props && props.valuePropertyName ? props.valuePropertyName : 'value';
    this.textPropertyName = props && props.textPropertyName ? props.textPropertyName : 'text';
  }

  render() {
    return (
     <div className="control-container">
       <select multiple onChange={this.OnChange.bind(this)} ref='listBox' className="select-control">
          <option value="-1" disabled  hidden>{this.props.placeholder}</option>
          {this.props.Items.map((item, i) => 
            <ListBoxItem key={item[this.valuePropertyName]}
            Item={{ 'Text': item[this.textPropertyName],
             'Value': item[this.valuePropertyName] }} />)}
        </select>
        </div> 
    );
  }
  OnChange(event) {
    let options = event.target.options;
    let value = [];

    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(+options[i].value);
      }
    }
    
    this.props.OnSelect(value);
  }
}
export default ListBox;