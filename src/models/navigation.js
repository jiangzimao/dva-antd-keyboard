/* eslint-disable no-undef */
import key from 'keymaster';
import { resolveKey, context } from '../utils/NavigationMonitor';

key.filter = (event) => {
  // const tagName = (event.target || event.srcElement).tagName;
  // key.setScope(/^(INPUT|TEXTAREA|SELECT)$/.test(tagName) ? 'input' : 'other');
  const { blockId } = getCurrentActive();
  key.setScope(blockId);
  console.log(event.target);
  console.log(blockId);
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

// 处理 document 单击事件
const documentClickListener = (dispatch, event) => {
  // 获取当前触发事件的元素
  let element = event.target;
  if (element) {
    // 触发事件元素的样式
    let classList = element.classList;
    // 判断当前元素是否是可被选中，如果没有，则向上一级查找，直到 BODY 为止
    while (!classList.contains('dcs-selectable') && !classList.contains('dcs-active')) {
      element = element.parentElement;
      if (element.tagName === 'BODY') {
        // 如果找到 body 也未找到，则从 document 获取已经标记选中的元素
        element = event.target.parentElement.querySelector(FOCUS_ABLE);
        // 如果为当前已标记的选择中的元素不能获得焦点，则获取可获得焦点的子元素触发单击事件
        if (element) {
          if (event.type === 'click' && event.target !== element) {
            element.click();
          }
        }
        return;
      }
      classList = element.classList;
    }
    // 如果父元素存在可选元素，则对可选元素进行获得焦点处理
    classList = new Set([...classList].filter(className => className.indexOf('dcs-item-') >= 0));
    classList.forEach((value) => {
      // 当前可选元素的 key
      const currentKey = value.replace('dcs-item-', '');
      // 根据 key 解析出 该元素所对应的可选区ID 和 可选元素ID
      const { blockId: activeBlockId, itemId: activeId } = resolveKey(currentKey);
      // 对可选元素进行 dcs-active 样式渲染
      dispatch({ type: 'special', payload: { activeBlockId, activeId } });
      // 对可选运行进行 focus 处理
      setFocus();
      if (!FOCUS_ABLE.split(',').includes(event.target.tagName)) {
        element = window.document.querySelector('.dcs-active, .dcs-table-active');
        if (element.querySelector(FOCUS_ABLE) !== null) {
          element = element.querySelector(FOCUS_ABLE); // 有可能有多个元素，则获取第一个元素
          if (event.type === 'click') {
            element.click();
          }
        }
      } else if (event.target !== element) {
        event.target.click();
      }
    });
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
      // document key down 事件处理
      // window.document.addEventListener('keydown', (event) => {
      //   key
      // });
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
      }
      return {
        ...state,
        activeBlockId: context.defaultBlockId,
        activeId: context.defaultActiveId,
      };
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
