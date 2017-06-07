import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { getCls, deal } from '../utils/active';

const ShortcutBlock = ({ navigation }) => {
  const { activeId } = navigation;
  return (
    <div>
      操作选项（F5）：
      <Button ref={input => deal(input, 'F5#1')} className={getCls(activeId, 'F5#1')}>BT1</Button>
      <Button ref={input => deal(input, 'F5#2')} className={getCls(activeId, 'F5#2')}>BT2</Button>
      <Button ref={input => deal(input, 'F5#3')} className={getCls(activeId, 'F5#3')}>BT3</Button>
      <Button ref={input => deal(input, 'F5#4')} className={getCls(activeId, 'F5#4')}>BT4</Button>
    </div>
  );
};


// 监听属性，建立组件和数据的映射关系
function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(ShortcutBlock);
