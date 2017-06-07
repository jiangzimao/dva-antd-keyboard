import React from 'react';
import { connect } from 'dva';
import { Button, Input, Radio, Row, Col } from 'antd';
import { show, watch } from '../utils/NavigationMonitor';

const RadioGroup = Radio.Group;

const FormBlock = ({ navigation }) => {
  const { activeId } = navigation;
  return (
    <Row type="flex" justify="space-around" align="middle">
      <Col span={22}>
        <Input ref={input => watch(input, 'a')} className={show(activeId, 'a')} />
        <Input ref={input => watch(input, 'az')} className={show(activeId, 'az')} />
        <Input ref={input => watch(input, 'ac')} className={show(activeId, 'ac')} />
        <Button type="primary" ref={input => watch(input, 'submit')} className={show(activeId, 'submit')}>提交</Button>
        <Button ref={input => watch(input, 'button')} className={show(activeId, 'button')}>取消</Button>
        <br />
        <RadioGroup>
          <Radio value={1} ref={input => watch(input, 'ae')} className={show(activeId, 'ae')}>选项一</Radio>
          <Radio value={2} ref={input => watch(input, 'ae1')} className={show(activeId, 'ae1')}>选项二</Radio>
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
