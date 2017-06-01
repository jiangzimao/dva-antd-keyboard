import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import ChoiceBlockItem from './ChoiceBlockItem';

const Main = (main) => {
  const { displayBlock, choiceBlock, formBlock } = main;
  return (
    <div>
      { displayBlock.map(block => <ChoiceBlockItem {...block} />) }
      { choiceBlock.map(block => <ChoiceBlockItem {...block} />) }
      { formBlock }
    </div>
  );
};

Main.propTypes = {
  main: PropTypes.object,
};

// 监听属性，建立组件和数据的映射关系
function mapStateToProps(state) {
  return { ...state.main };
}

export default connect(mapStateToProps)(Main);
