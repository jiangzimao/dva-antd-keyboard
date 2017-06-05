/* eslint-disable no-undef */
import key from 'keymaster';
import * as dcs from '../constant';

key.filter = (event) => {
  const tagName = (event.target || event.srcElement).tagName;
  key.setScope(/^(INPUT|TEXTAREA|SELECT)$/.test(tagName) ? 'input' : 'other');
  return true;
};

window.document.addEventListener('focus', (e) => {
  console.log(`focus:${e.target}`);
});

/**
 * 键盘导航 model
 */
export default {

  namespace: 'navigation',

  state: {
    activeId: dcs.defaultActiveId,       // 当前被激活的元素ID，默认为命令输入框获得焦点
    activeBlockId: dcs.defaultBlockId,  // 当前切换区域ID
  },

  subscriptions: {
    keyboardWatcher({ dispatch }) {
      key('esc', (event) => { dispatch({ type: 'esc' }); event.stopPropagation(); event.preventDefault(); });
      key('left, up, shift+tab', (event) => { dispatch({ type: 'last' }); event.stopPropagation(); event.preventDefault(); });
      key('right, down, tab', (event) => { dispatch({ type: 'next' }); event.stopPropagation(); event.preventDefault(); });
    },
  },

  effects: {
    // *fetch({ payload }, { call, put }) {  // eslint-disable-line
    //   yield put({ type: 'save' });
    // },
  },

  reducers: {

    // 定义 Esc 事件
    esc(state) {
      console.log(state);
      return { ...state, activeBlockId: dcs.defaultBlockId, activeId: dcs.defaultActiveId };
    },

    // 定义 next 事件导航
    next(state) {
      const { activeBlockId, activeId } = state;
      const currentBlockItems = Array.from(dcs.blocks.get(activeBlockId));
      let currentActiveIndex = currentBlockItems.findIndex((value) => {
        return value === activeId;
      });
      if (currentActiveIndex === currentBlockItems.length - 1) {
        currentActiveIndex = 0;
      } else {
        currentActiveIndex += 1;
      }
      const nextActiveId = currentBlockItems[currentActiveIndex];
      dcs.currentActiveId = nextActiveId;
      return { ...state, activeId: nextActiveId };
    },

    // 定义 last 事件导航
    last(state) {
      const blocks = dcs.blocks;
      const { activeBlockId, activeId } = state;
      const currentBlockItems = Array.from(blocks.get(activeBlockId));
      let currentActiveIndex = currentBlockItems.findIndex((value) => {
        return value === activeId;
      });
      if (currentActiveIndex === 0) {
        currentActiveIndex = currentBlockItems.length - 1;
      } else {
        currentActiveIndex -= 1;
      }
      const nextActiveId = currentBlockItems[currentActiveIndex];
      dcs.currentActiveId = nextActiveId;
      return { ...state, activeId: nextActiveId };
    },
  },

};
