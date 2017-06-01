import React from 'react';
import { Button, Row, Col } from 'antd';
import style from '../index.css';

const ChoiceBlockItem = (item) => {
  return (
    <Row type="flex" justify="space-around" align="middle">
      <Col span={2}>{ item.title }</Col>
      <Col span={22}><Button className={style.title}>Default</Button><Button>Default</Button></Col>
    </Row>
  );
};

export default ChoiceBlockItem;
