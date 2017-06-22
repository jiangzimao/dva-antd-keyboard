/**
 * Created by Administrator on 2017/6/11.
 */
import React, { Component } from 'react';

//  高阶组件定义
const HOC = WrappedComponent =>
  class WrapperComponent extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
export default HOC;
