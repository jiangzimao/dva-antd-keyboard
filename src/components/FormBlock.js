import React from 'react';
import { connect } from 'dva';
import { Button, Input, Radio, Row, Col } from 'antd';
import { getCls, deal } from '../utils/active';
import * as dcs from '../constant';

const FormBlock = ({ navigation }) => {
  const { activeId } = navigation;
  return (
    <Row type="flex" justify="space-around" align="middle">
      <Col span={22}>
        <Input ref={input => deal(input, 'a')} className={getCls(activeId, 'a')} />
        <Input ref={input => deal(input, 'az')} className={getCls(activeId, 'az')} />
        <Input ref={input => deal(input, 'ac')} className={getCls(activeId, 'ac')} />
        <Button ref={input => deal(input, 'ad')} className={getCls(activeId, 'ad')}>Default</Button>
        <Radio ref={input => deal(input, 'ae')} className={getCls(activeId, 'ae')}>Radio</Radio>
      </Col>
    </Row>
  );
};


// 监听属性，建立组件和数据的映射关系
function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(FormBlock);
