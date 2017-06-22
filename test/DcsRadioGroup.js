import React from 'react';
import { Radio } from 'antd';
import { context } from '../../utils/NavMonitor';

class DcsRadioGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      id: props.id,
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange() {
    this.setState({ checked: true });
    this.triggerChange();
  }

  onClick() {
    this.onChange();
  }

  triggerChange() {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(this.state.value);
      console.log(`值是：${this.state.value}`);
    }
  }

  render() {
    return (
      <Radio
        checked={this.state.checked}
        value={this.state.value}
        onChange={this.onChange}
        onClick={this.onClick}
      >
        {this.props.children}
      </Radio>
    );
  }
}

export default DcsRadioGroup;
