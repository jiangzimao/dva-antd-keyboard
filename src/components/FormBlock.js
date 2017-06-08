import React from 'react';
import { connect } from 'dva';
import { Button, Input, Radio, Row, Col } from 'antd';
import { show, watch, register } from '../utils/NavigationMonitor';

const RadioGroup = Radio.Group;

const blockId = 'F7';

const shortcutKey = new Map();

shortcutKey.set('alt+1', (dispatch, event) => {
  console.log(event.keyCode);
  // 调用 action
});

shortcutKey.set('alt+2', (dispatch, event) => {
  console.log(event.keyCode);
  // 调用 action
});

const FormBlock = ({ dispatch, navigation }) => {
  const { activeId } = navigation;
  return (
    <div ref={(div) => { register(div, blockId, shortcutKey, dispatch); }}>
      表单(F7)
      <Row type="flex" justify="space-around" align="middle">
        <Col span={22}>
          <RadioGroup>
            <Radio value={1}>选项一（1）</Radio>
            <Radio value={2}>选项二（2）</Radio>
          </RadioGroup>
        </Col>
      </Row>
      <Row type="flex" justify="space-around" align="middle">
        <Col span={22}>
          <Input ref={input => watch(input, `${blockId}#input1`)} className={show(activeId, `${blockId}#input1`)} />
          <Input ref={input => watch(input, `${blockId}#input2`)} className={show(activeId, `${blockId}#input2`)} />
          <Input ref={input => watch(input, `${blockId}#input3`)} className={show(activeId, `${blockId}#input3`)} />
          <Button
            type="primary" ref={input => watch(input, `${blockId}#submit`)}
            className={show(activeId, `${blockId}#submit`)}
          >提交</Button>
          <Button
            ref={input => watch(input, `${blockId}#button`)}
            className={show(activeId, `${blockId}#button`)}
          >取消</Button>
          <br />
        </Col>
      </Row>
    </div>
  );
};


// 监听属性，建立组件和数据的映射关系
function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(FormBlock);
