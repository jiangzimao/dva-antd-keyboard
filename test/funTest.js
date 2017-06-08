/**
 * Created by 004811 on 2017/6/8.
 */
const register = (dispatch, method) => {
  if (method && typeof method === 'function') {
    method.call(this, dispatch);
  }
};

const fun = (dispatch) => {
  if (dispatch !== null) {
    console.log(dispatch);
  }
};

register('hello js', fun);

