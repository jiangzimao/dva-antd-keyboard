import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { show, watch, register } from '../utils/NavigationMonitor';

const blockId = 'F6';

const shortcutKey = new Map();

shortcutKey.set('ctrl+right', (dispatch, event) => {
  console.log(`${event.keyCode}-${blockId}上一页`);
  // 调用 action
});

shortcutKey.set('ctrl+left', (dispatch, event) => {
  console.log(`${event.keyCode}-${blockId}下一页`);
  // 调用 action
});

const ShortcutBlock2 = ({ dispatch, navigation }) => {
  const { activeId } = navigation;
  return (
    <div ref={div => register(div, blockId, shortcutKey, dispatch)}>
      操作选项（F6）：
      <Button ref={input => watch(input, `${blockId}#b1`)} className={show(activeId, `${blockId}#b1`)}>按钮1</Button>
      <Button ref={input => watch(input, `${blockId}#b2`)} className={show(activeId, `${blockId}#b2`)}>按钮2</Button>
      <Button ref={input => watch(input, `${blockId}#b3`)} className={show(activeId, `${blockId}#b3`)}>按钮3</Button>
      <Button ref={input => watch(input, `${blockId}#b4`)} className={show(activeId, `${blockId}#b4`)}>按钮4</Button>
    </div>
  );
};


// 监听属性，建立组件和数据的映射关系
function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(ShortcutBlock2);
