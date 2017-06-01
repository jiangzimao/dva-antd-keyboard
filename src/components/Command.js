import React from 'react';
import { Row, Col, Form, Input } from 'antd';

const FormItem = Form.Item;

const Command = () => {
  return (
    <Row type="flex" justify="space-around" align="middle">
      <Col span={2}>旅客／值机／添加行李</Col>
      <Col span={16}>
        <Form>
          <FormItem>
            <Input placeholder="input search text" />
          </FormItem>
        </Form>
      </Col>
      <Col span={6}>用户信息、网络状态</Col>
    </Row>
  );
};

export default Command;
