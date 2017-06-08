/* eslint-disable no-undef */
import key from 'keymaster';
import { resolveKey, updateBlock, context } from '../utils/NavigationMonitor';

key.filter = (event) => {
  const tagName = (event.target || event.srcElement).tagName;
  if (tagName !== 'BODY') {
    const block = getCurrentActive();
    if (block) {
      const { blockId } = block;
      key.setScope(blockId);
    }
  }
  return true;
};

// 可直接获得焦点的标签
const FOCUS_ABLE = 'INPUT,BUTTON,SELECT,TEXTAREA';

// 判断是否为可编辑的输入框
const isInputElement = (element) => {
  if (element.tagName === 'INPUT') {
    return element.type === 'text';
  }
  const focusAbleArr = FOCUS_ABLE.split(',');
  return focusAbleArr.includes(element.tagName);
};

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

//  判断是否当前获得焦点的元素为正在打开的选择框
const isSelectElementOpen = () => {
  const dcsActive = document.querySelector('.dcs-active');
  if (dcsActive) {
    return dcsActive.className.split(' ').includes('ant-select-open');
  }
  return false;
};

// TODO 关闭选择框
const closeSelect = () => {
  const dcsActive = document.querySelector('.dcs-active');
  if (dcsActive) {
    dcsActive.className = dcsActive.className.replace('ant-select-open', '');
  }
};

// 判断值是否为空
const isEmpty = (value) => {
  return value === null || value === undefined || value === '';
};

// 根据.dcs-active, .dcs-table-active 给元素获得焦点
const setFocus = () => {
  let element = window.document.querySelector('.dcs-active, .dcs-table-active');
  if (element) {
    if (FOCUS_ABLE.split(',').includes(element.tagName)) {
      element.focus();
    } else if (element.querySelector(FOCUS_ABLE) !== null) {
      element = element.querySelector(FOCUS_ABLE); // 有可能有多个元素，则获取第一个元素
      element.focus();
    }
  }
};

/**
 * 处理 document 单击事件
 *
 * <p>
 *  document 单击事件处理流程：
 *    1、 查找事件源或父节点可被选中的节点高亮
 *    2、 查找事件源或子节点可获得焦点的节点触发 click
 * </p>
 * @param dispatch
 * @param event
 */
const documentClickListener = (dispatch, event) => {
  // 获取当前触发事件的元素
  let element = event.target || event.srcElement;
  if (element) {
    // 查找事件源或父节点可被选中的节点高亮
    let classList = element.classList; // 触发事件元素的样式
    while (!classList.contains('dcs-selectable')) {
      element = element.parentElement;
      if (element.tagName === 'BODY') {
        return;
      }
      classList = element.classList;
    }
    classList = new Set([...classList].filter(className => className.indexOf('dcs-item-') >= 0));
    if (classList !== null && classList.size > 0) {
      classList = [...classList];
      const currentItemKey = classList[0].replace('dcs-item-', '');
      const { blockId: activeBlockId, itemId: activeId } = resolveKey(currentItemKey);
      dispatch({ type: 'special', payload: { activeBlockId, activeId } });
      // 查找事件源或子节点可获得焦点的节点触发 click
      element = event.target || event.srcElement;
      if (!FOCUS_ABLE.split(',').includes(event.target.tagName)) {
        element = element.parentElement.querySelector(FOCUS_ABLE);
        if (element) {
          if (event.type === 'click' && element.type !== 'text' && event.target !== element) {
            if (element.type === 'checkbox') {
              element.focus();
            }
          } else {
            element.focus();
          }
        }
      } else {
        element.focus();
      }
    }
    // event.stopPropagation();
    // event.preventDefault();
  }
};
/**
 * 键盘导航 model
 */
export default {

  namespace: 'navigation',

  state: {
    activeId: context.defaultActiveId,       // 当前被激活的元素ID，默认为命令输入框获得焦点
    activeBlockId: context.defaultBlockId,  // 当前切换区域ID
    fallbackQueue: new Set(),           // 返回区
    fallback: null,                      // 当前要返回的页面
  },

  subscriptions: {
    setup({ dispatch }) {
      // document click 事件处理
      window.document.addEventListener('click', event => documentClickListener(dispatch, event));
    },
    keyboardWatcher({ dispatch }) {
      key('enter', () => dispatch({ type: 'enter' }));
      key('esc', () => {
        if (isSelectElementOpen()) {
          closeSelect();
          return;
        }
        dispatch({ type: 'esc' });
        setFocus();
      });
      key('left, up, shift+tab', (event) => {
        const element = event.target;
        const keyCode = event.keyCode;
        if (isInputElement(element) && [37, 38].includes(keyCode)) {
          if (!isEmpty(element.value) || (keyCode === 38 && isSelectElementOpen())) {
            return true;
          }
        }
        dispatch({ type: 'step', payload: { step: -1 } });
        setFocus();
        return false;
      });
      key('right, down, tab', (event) => {
        const element = event.target;
        const keyCode = event.keyCode;
        if (isInputElement(element) && [39, 40].includes(keyCode)) {
          if (!isEmpty(element.value) || (keyCode === 40 && isSelectElementOpen())) {
            return true;
          }
        }
        dispatch({ type: 'step', payload: { step: 1 } });
        setFocus();
        event.stopPropagation();
        event.preventDefault();
        return false;
      });
      key('space', () => { dispatch({ type: 'selectItem' }); });
      key('f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12', (event) => {
        const activeBlockId = event.code;
        if (context.blocks.has(activeBlockId)) {
          context.currentBlockId = activeBlockId;
          const blockItem = context.blocks.get(activeBlockId);
          dispatch({ type: 'special', payload: { activeBlockId, activeId: [...blockItem][0] } });
        }
        setFocus();
        event.stopPropagation();
        event.preventDefault();
        return false;
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
      updateBlock(activeBlockId, activeId);
      if (activeBlockId && activeId) {
        const newState = { ...state, activeBlockId, activeId };
        return newState;
      }
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

    // 回车事件
    enter(state) {
      //  TODO
      const element = window.document.querySelector('.dcs-active, .dcs-table-active');
      console.log(`您选择了[${element.innerText}]`);
      return { ...state };
    },

    /**
     * 定义 Esc 事件
     * <p>
     *  如果存在可返回的页面，则返回到上一页面，否则默认cmd获得焦点
     * </p>
     * @param state
     * @returns {{activeBlockId, activeId}}
     */
    esc(state) {
      event.stopPropagation();
      event.preventDefault();
      const { fallbackQueue } = state;
      const fallbackArr = Array.from(fallbackQueue);
      if (fallbackArr.length > 0) {
        const { fallback, ...newFallbackQueue } = fallbackArr;
        return { ...state, fallbackQueue: newFallbackQueue, fallback };
      } else {
        updateBlock(context.defaultBlockId, context.defaultActiveId);
        return {
          ...state,
          activeBlockId: context.defaultBlockId,
          activeId: context.defaultActiveId,
        };
      }
    },

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
