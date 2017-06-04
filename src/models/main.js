/* eslint-disable no-undef */

export default {

  namespace: 'main',

  state: {
    displayBlock: [], // 信息显示块
    choiceBlock: [],  // 选择操作块
    formBlock: null,  // 表单显示块
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({
        type: 'init',
      });
    },
  },

  effects: {
    // *fetch({ payload }, { call, put }) {  // eslint-disable-line
    //   yield put({ type: 'save' });
    // },
  },

  reducers: {
    init(state, action) {
      const formBlock = '这是我的说明';
      const choiceBlock = [
        { title: '这是说明', choiceItems: '这是描述' },
        { title: '这是说明1', choiceItems: '这是描述1' },
      ];
      return { ...state, ...action.payload, choiceBlock, formBlock };
    },
  },

};
