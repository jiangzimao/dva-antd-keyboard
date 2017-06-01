import React from 'react';
import { Input, Row, Col } from 'antd';

const FromBlock = () => {
  return (
    <Row type="flex" justify="space-around" align="middle">
      <Col span={22}>
        <Input />
        <Input />
        <Input />
      </Col>
    </Row>
  );
};

export default FromBlock;
