import React from 'react';
import { Checkbox } from 'antd';
import { context } from '../../utils/NavMonitor';

class DcsCheckbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || false,
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
    const checked = !this.state.checked;
    this.setState({ checked });
    this.triggerChange(checked);
  }

  onClick(e) {
    this.setState({ checked: e.target.checked });
    this.triggerChange(e.target.checked);
  }

  triggerChange(checked) {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(checked);
    }
  }

  render() {
    return (
      <Checkbox
        checked={this.state.checked}
        onChange={this.onChange}
        onClick={this.onClick}
      />
    );
  }
}

export default DcsCheckbox;
