import React from 'react'
import { Table, Button, Popconfirm } from 'antd'
import { Link } from 'dva/router'

const List = ({ showContactInfo, onUpdate, onDeleteItem, ...tableProps }) => {
  const columns = [
    {
      title: '',
      dataIndex: 'info',
      key: 'info',
      render: (text, record) => (
        <span>
          <Button
            icon="info-circle"
            shape="circle"
            type="primary"
            size="small"
            ghost="true"
            onClick={() => showContactInfo(record)}
          />
        </span>
      ),
    },
    {
      title: 'First Name',
      dataIndex: 'FirstName',
      key: 'firstname',
      className: 'leftAlign',
    },
    {
      title: 'Middle Name',
      dataIndex: 'MiddleName',
      className: 'leftAlign',
      key: 'middlename',
    },
    {
      title: 'Last Name',
      dataIndex: 'LastName',
      className: 'leftAlign',
      sorter: true,
      key: 'state',
    },
    {
      title: 'Position',
      dataIndex: 'Position',
      className: 'leftAlign',
      sorter: true,
      key: 'position',
    },
    {
      title: 'Function',
      dataIndex: 'ContactFunction',
      className: 'leftAlign',
      key: 'contactfunction',
    },
    {
      title: 'Mobile',
      dataIndex: 'Mobile1',
      className: 'leftAlign',
      key: 'mobile',
    },
    {
      title: 'Email',
      dataIndex: 'EmailWork',
      className: 'leftAlign',
      key: 'emailwork',
    },
    {
      title: 'Action',
      key: 'action',
      className: 'rightAlign actionColumn',
      render: (text, record) => (
        <span>
          <Button
            icon="edit"
            type="default"
            size="small"
            onClick={() => onUpdate(record)}
          >
            Edit
          </Button>
          <span className="ant-divider" />
          <Popconfirm
            title="Are you sure you want to delete？"
            okText="Yes"
            cancelText="No"
            placement="left"
            onConfirm={() => onDeleteItem(record.id)}
          >
            <Button icon="delete" type="danger" size="small">
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ]
  return (
    <Table
      {...tableProps}
      columns={columns}
      rowKey={record => record.id}
      bordered
      onRowClick={record => showContactInfo(record)}
    />
  )
}

export default List
