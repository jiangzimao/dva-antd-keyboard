import React from 'react';
import { Row, Col } from 'antd';
import Header from '../components/Header';
import Command from '../components/Command';
import Main from '../components/Main';

function IndexPage() {
  return (
    <div>
      <Row type="flex" justify="center">
        <Col span={24}>
          <Header />
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={24}>
          <Command />
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={24}>
          <Main />
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={24}>设备状态</Col>
      </Row>
    </div>
  );
}

export default IndexPage;
