/**
 * Created by 004811 on 2017/6/7.
 */
import React from 'react';
import { connect } from 'dva';
import { AutoComplete } from 'antd';
import { getCls, deal } from '../utils/active';

function onSelect(value) {
  console.log('onSelect', value);
}

const dataSource = ['a', 'ab', 'ac', 'ad'];

const AutoCompleteDemo = ({ navigation }) => {
  const { activeId } = navigation;

  return (
    <AutoComplete
      ref={input => deal(input, 'aci')}
      className={getCls(activeId, 'aci')}
      dataSource={dataSource}
      style={{ width: 200 }}
      onSelect={onSelect}
      placeholder="input here"
    />
  );
};


// 监听属性，建立组件和数据的映射关系
function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(AutoCompleteDemo);
