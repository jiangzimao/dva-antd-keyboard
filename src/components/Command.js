import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Input } from 'antd';
import { getCls, deal } from '../utils/active';

const FormItem = Form.Item;

const Command = ({ navigation }) => {
  const { activeId } = navigation;
  return (
    <Row type="flex" justify="space-around" align="middle">
      <Col span={2}>旅客／值机／添加行李</Col>
      <Col span={16}>
        <Form>
          <FormItem>
            <Input
              ref={(input) => { deal(input, 'cmd'); }}
              className={getCls(activeId, 'cmd')}
              placeholder="input search text"
            />
          </FormItem>
        </Form>
      </Col>
      <Col span={6}>用户信息、网络状态</Col>
    </Row>
  );
};

// 监听属性，建立组件和数据的映射关系
function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(Command);
