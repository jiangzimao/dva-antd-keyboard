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
        <Input ref={input => deal(dcs.defaultBlockId, 'a', input)} className={getCls(activeId, 'a')} />
        <Input ref={input => deal(dcs.defaultBlockId, 'az', input)} className={getCls(activeId, 'az')} />
        <Input ref={input => deal(dcs.defaultBlockId, 'ac', input)} className={getCls(activeId, 'ac')} />
        <Button ref={input => deal(dcs.defaultBlockId, 'ad', input)} className={getCls(activeId, 'ad')}>Default</Button>
        <Radio ref={input => deal(dcs.defaultBlockId, 'ae', input)} className={getCls(activeId, 'ae')}>Radio</Radio>
      </Col>
    </Row>
  );
};


// 监听属性，建立组件和数据的映射关系
function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(FormBlock);
