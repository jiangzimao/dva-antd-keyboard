import React from 'react';
import { Button, Row, Col, Radio } from 'antd';
import active from '../utils/active';
import uui from '../utils/uui';

const RadioGroup = Radio.Group;

const componentId = uui();

const ChoiceBlockItem = ({ activeId, item }) => {
  return (
    <Row type="flex" justify="space-around" align="middle">
      <Col span={2}>{ item.title }</Col>
      <Col span={22}>
        <Button ref={(button) => { active(button, componentId); }}>Default</Button>
        <Button>Default</Button>
        <input ref={(input) => { active(input, componentId); }} />
        <ul>
          <li ref={(li) => { active(li, componentId); }}>aaa</li>
        </ul>
        <RadioGroup>
          <Radio value={1} className="dcs-active" ref={(radio) => { active(radio, componentId); }}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio value={3}>C</Radio>
          <Radio value={4}>D</Radio>
        </RadioGroup>
      </Col>
    </Row>
  );
};

export default ChoiceBlockItem;
