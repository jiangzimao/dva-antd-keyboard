import React from 'react';
import { connect } from 'dva';
import { Button, Input, Radio, Row, Col } from 'antd';
import { getCls, deal } from '../utils/active';

const RadioGroup = Radio.Group;

const FormBlock = ({ navigation }) => {
  const { activeId } = navigation;
  return (
    <Row type="flex" justify="space-around" align="middle">
      <Col span={22}>
        <Input ref={input => deal(input, 'a')} className={getCls(activeId, 'a')} />
        <Input ref={input => deal(input, 'az')} className={getCls(activeId, 'az')} />
        <Input ref={input => deal(input, 'ac')} className={getCls(activeId, 'ac')} />
        <Button type="primary" ref={input => deal(input, 'submit')} className={getCls(activeId, 'submit')}>提交</Button>
        <Button ref={input => deal(input, 'button')} className={getCls(activeId, 'button')}>取消</Button>
        <br />
        <RadioGroup>
          <Radio value={1} ref={input => deal(input, 'ae')} className={getCls(activeId, 'ae')}>选项一</Radio>
          <Radio value={2} ref={input => deal(input, 'ae1')} className={getCls(activeId, 'ae1')}>选项二</Radio>
        </RadioGroup>
      </Col>
    </Row>
  );
};


// 监听属性，建立组件和数据的映射关系
function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(FormBlock);
