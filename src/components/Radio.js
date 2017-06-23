import React from 'react';
import RcCheckbox from 'rc-checkbox';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';

export default class Radio extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-radio',
    type: 'radio',
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState) ||
      !shallowEqual(this.context.radioGroup, nextContext.radioGroup);
  }

  render() {
    const { props, context } = this;
    const {
      prefixCls,
      className,
      children,
      style,
      ...restProps
    } = props;
    const { radioGroup } = context;
    const radioProps = { ...restProps };
    if (radioGroup) {
      radioProps.onChange = radioGroup.onChange;
      radioProps.checked = props.value === radioGroup.value;
      radioProps.disabled = props.disabled || radioGroup.disabled;
    }
    const wrapperClassString = classNames(className, {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-checked`]: radioProps.checked,
      [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
    });

    return (
      <label
        className={wrapperClassString}
        style={style}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        <RcCheckbox
          {...radioProps}
          prefixCls={prefixCls}
          onChange={this.onChange}
        />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
