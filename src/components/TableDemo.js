/* eslint-disable block-spacing */
import React from 'react';
import { connect } from 'dva';
import { show, watch } from '../utils/NavigationMonitor';
import { Table, Icon } from 'antd';

const { Column, ColumnGroup } = Table;

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Disabled User',
  age: 99,
  address: 'Sidney No. 1 Lake Park',
}];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User',    // Column configuration not to be checked
  }),
};

const getTableRowClass = (activeId, record, index) => {
  const cls = show(activeId, `tr${index}`);
  return cls;
};

const TableDemo = ({ navigation }) => {
  const { activeId } = navigation;
  return (
    <Table
      rowRef={(record, index) => watch(record, `tr${index}`)}
      rowClassName={(record, index) => getTableRowClass(activeId, record, index)}
      rowSelection={rowSelection}
      bordered
      columns={columns}
      dataSource={data}
    />
  );
};

// 监听属性，建立组件和数据的映射关系
function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(TableDemo);
