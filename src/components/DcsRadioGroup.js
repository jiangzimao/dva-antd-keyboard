import React from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

class DcsRadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onChange: props.onChange,
      value: props.value,
      defaultValue: props.defaultValue,
      size: props.options,
      options: props.options,
    };
    if (props.options && props.options.length > 0) {
      const keys = props.options.map((option) => {
        const { id, key } = option;
        console.log(`${id}=${key}`);
        return { id, key };
      });
      console.log(keys.length);
    }
    this.onChange.bind(this);
  }

  onChange (e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <RadioGroup options={this.state.options} onChange={this.onChange} value={this.state.value} />
    );
  }

}

export default DcsRadioGroup;
