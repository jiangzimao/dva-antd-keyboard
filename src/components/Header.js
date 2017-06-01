import React from 'react';
import { Row, Col } from 'antd';

const Header = () => {
  return (
    <Row type="flex" justify="space-around" align="middle">
      <Col span={2}>菜单F4选择框</Col>
      <Col span={4}>春秋离港系统</Col>
      <Col span={18}>航班选项卡</Col>
    </Row>
  );
};

export default Header;
