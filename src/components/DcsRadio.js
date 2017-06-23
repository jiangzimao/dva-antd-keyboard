import React from 'react';
import { Radio } from 'antd';

class DcsRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      key: props.key,
      checked: props.checked,
      value: props.value,
      defaultChecked: props.defaultChecked,
    };
  }

  onChange(e) {
    const event = e.target;
    if (event && event.checked) {
      const onChange = this.props.onChange;
      if (onChange) {
        onChange(this.state.value);
      }
    }
  }

  render() {
    return (
      <Radio
        id={this.state.id}
        checked={this.state.checked}
        value={this.state.value}
        defaultChecked={this.state.defaultChecked}
        onChange={this.onChange}
      >
        { this.props.children }
      </Radio>
    );
  }

}

export default DcsRadio;
