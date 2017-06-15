/* eslint-disable no-undef */

import { resolveKey, updateContext, setFocus, context } from '../utils/NavMonitor';


// 获取当前焦点信息
const getCurrentActive = () => {
  const dcsActive = document.querySelector('.dcs-active,.dcs-table-active');
  let currentActive = null;
  if (dcsActive) {
    let classList = dcsActive.classList;
    classList = new Set([...classList].filter(className => className.indexOf('dcs-item-') >= 0));
    classList.forEach((value) => {
      // 当前可选元素的 key
      const currentKey = value.replace('dcs-item-', '');
      // 根据 key 解析出 该元素所对应的可选区ID 和 可选元素ID
      currentActive = resolveKey(currentKey);
    });
    return currentActive;
  }
};

// 判断值是否为空
const isEmpty = (value) => {
  return value === null || value === undefined || value === '';
};

/**
 * 键盘导航 model
 */
export default {

  namespace: 'navigator',

  state: {
    activeId: context.defaultActiveId,       // 当前被激活的元素ID，默认为命令输入框获得焦点
    activeBlockId: context.defaultBlockId,  // 当前切换区域ID
    shortcutKey: new Set(), // 快捷键
  },

  subscriptions: {
    setup({ dispatch }) {
      // 注册监听事件
      window.onKeyUp = (event) => {
        const keyCode = event.keyCode;
        const altKey = event.altKey;
        const ctrlKey = event.ctrlKey;
        const shiftKey = event.shiftKey;
        dispatch({ type: 'keyHandler', payload: { keyCode, altKey, ctrlKey, shiftKey } });
      };
    },
  },

  effects: {
    // Esc 返回
    *esc({ payload }, { put, select }) {
      const main = yield select(state => state.main);
      const { pageName } = main;
      if (pageName !== 'PaxList') {
        yield put({ type: 'setState', payload: { activeId: 'cmd', activeBlockId: 'all' } });
        yield put({ type: 'main/setState', payload: { pageName: 'PaxList' } });
      } else {
        updateContext({ activeBlockId: context.defaultBlockId, activeId: context.defaultActiveId });
        yield put({
          type: 'setState',
          payload: {
            activeBlockId: context.defaultBlockId,
            activeId: context.defaultActiveId,
          },
        });
      }
    },
  },

  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    keyHandler(state, { payload }) {
      const { keyCode, altKey, ctrlKey, shiftKey } = payload;
      const { shortcutKey } = state;
      const matchedShortcutKey = new Set([...shortcutKey].filter((key) => {
        // 判断级别 组合键 > 单键
        return key.keyCode === keyCode;
      }));
      if (matchedShortcutKey && matchedShortcutKey.size > 0) {
        const { fun } = matchedShortcutKey;
        fun.call(null);
      }
    },

    // shortcutKey(state, { payload }) {
    //   const shortcutKey = state.shortcutKey;
    //   const {} = payload;
    //   shortcutKey.add({});
    //   return { ...state, shortcutKey: {}};
    // },

    // 上一步/下一步
    step(state, action) {
      const { activeBlockId, activeId } = state;
      const { step } = action.payload;
      const currentBlockItems = Array.from(context.blocks.get(activeBlockId));
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
      context.currentActiveId = nextActiveId;
      event.stopPropagation();
      event.preventDefault();
      return { ...state, activeId: nextActiveId };
    },
  },

};
