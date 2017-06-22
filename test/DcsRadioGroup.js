import React from 'react';
import { Radio } from 'antd';
import { context } from '../../utils/NavMonitor';

class DcsRadioGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
      value: props.value,
      key: props.shortcutkey,
      id: props.id,
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    // console.log(`add checkbox ${this.state.id}`);
    if (!context.shortcutKeyMap.has('_form_key')) {
      context.shortcutKeyMap.set('_form_key', new Map());
    }
    const formKeyMap = context.shortcutKeyMap.get('_form_key');
    formKeyMap.set(this.state.id, { key: this.state.key, fun: this.onChange });
  }

  componentWillUnmount() {
    // console.log(`remove checkbox ${this.state.id}`);
    if (!context.shortcutKeyMap.has('_form_key')) {
      context.shortcutKeyMap.set('_form_key', new Map());
    }
    const formKeyMap = context.shortcutKeyMap.get('_form_key');
    formKeyMap.delete(this.state.id);
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
