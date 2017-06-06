/* eslint-disable no-undef */
import key from 'keymaster';
import * as dcs from '../constant';
import { resolveKey } from '../utils/active';

key.filter = (event) => {
  const tagName = (event.target || event.srcElement).tagName;
  key.setScope(/^(INPUT|TEXTAREA|SELECT)$/.test(tagName) ? 'input' : 'other');
  return true;
};

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
    setup({ dispatch }) {
      window.document.addEventListener('click', (e) => {
        let element = e.target;
        if (element) {
          let classList = element.classList;
          while (!classList.contains('dcs-selectable')) {
            element = element.parentElement;
            if (element.tagName === 'BODY') {
              return;
            }
            classList = element.classList;
          }
          classList = new Set([...classList].filter(className => className.indexOf('dcs-item-') >= 0));
          classList.forEach((value) => {
            const currentKey = value.replace('dcs-item-', '');
            const { blockId: activeBlockId, itemId: activeId } = resolveKey(currentKey);
            dispatch({ type: 'special', payload: { activeBlockId, activeId } });
          });
        }
      });
    },
    keyboardWatcher({ dispatch }) {
      key('enter', (event) => {
        const element = window.document.querySelector('.dcs-active, .dcs-table-active');
        alert(`您选择了[${element.innerText}]`);
        event.stopPropagation();
        event.preventDefault();
      });
      key('esc', (event) => { dispatch({ type: 'esc' }); event.stopPropagation(); event.preventDefault(); });
      key('left, up, shift+tab', () => { dispatch({ type: 'last', payload: { dispatch } }); });
      key('right, down, tab', () => { dispatch({ type: 'next', payload: { dispatch } }); });
      key('space', () => { dispatch({ type: 'selectItem' }); });
      key('f2, f3, f4', (event) => {
        const activeBlockId = event.code;
        if (dcs.blocks.has(activeBlockId)) {
          const blockItem = dcs.blocks.get(activeBlockId);
          const activeIds = [...blockItem];
          const activeId = activeIds[0];
          dispatch({ type: 'special', payload: { activeBlockId, activeId } });
        }
      });
    },
  },

  effects: {
    // *fetch({ payload }, { call, put }) {  // eslint-disable-line
    //   yield put({ type: 'save' });
    // },
  },

  reducers: {
    // 指定元素
    special(state, action) {
      const { activeBlockId, activeId } = action.payload;
      if (activeBlockId && activeId) {
        const newState = { ...state, activeBlockId, activeId };
        return newState;
      }
      event.stopPropagation();
      event.preventDefault();
      return { ...state, activeId };
    },

    // 选中事件
    selectItem(state) {
      const element = window.document.querySelector('.dcs-active, .dcs-table-active');
      if (element.tagName !== 'INPUT') {
        const input = element.querySelector('INPUT');
        input.click();
        event.stopPropagation();
        event.preventDefault();
      }
      return { ...state };
    },

    // 定义 Esc 事件
    esc(state) {
      return { ...state, activeBlockId: dcs.defaultBlockId, activeId: dcs.defaultActiveId };
    },

    // step
    step(state, action) {
      const { activeBlockId, activeId } = state;
      const { step } = action.payload;
      const currentBlockItems = Array.from(dcs.blocks.get(activeBlockId));
      let currentActiveIndex = currentBlockItems.findIndex((value) => {
        return value === activeId;
      });
      if (step > 0) {
        if (currentActiveIndex === currentBlockItems.length - 1) {
          currentActiveIndex = 0;
        } else {
          currentActiveIndex += 1;
        }
      } else if (step < 0) {
        if (currentActiveIndex === 0) {
          currentActiveIndex = currentBlockItems.length - 1;
        } else {
          currentActiveIndex -= 1;
        }
      }
      const nextActiveId = currentBlockItems[currentActiveIndex];
      dcs.currentActiveId = nextActiveId;
      event.stopPropagation();
      event.preventDefault();
      return { ...state, activeId: nextActiveId };
    },

    // 定义 next 事件导航
    next(state, action) {
      const { dispatch } = action.payload;
      dispatch({ type: 'state', payload: { step: 1 } });
    },

    // 定义 last 事件导航
    last(state, action) {
      const { dispatch } = action.payload;
      dispatch({ type: 'state', payload: { step: -1 } });
    },
  },

};
