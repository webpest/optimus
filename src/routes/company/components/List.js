import React from 'react'
import { Table, Button, Popconfirm } from 'antd'
import { Link } from 'dva/router'

const List = ({ showCompanyInfo, onUpdate, onDeleteItem, ...tableProps }) => {
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
            onClick={() => showCompanyInfo(record)}
          />
        </span>
      ),
    },
    {
      title: 'Company Name',
      dataIndex: 'company_name',
      key: 'company',
      className: 'leftAlign',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
      sorter: (a, b) => a.company_name.length - b.company_name.length,
      render: (text, record) => <Link to={`/company/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      className: 'leftAlign',
      sorter: (a, b) => a.country.length - b.country.length,
      key: 'country',
    },
    {
      title: 'State',
      dataIndex: 'state',
      className: 'leftAlign',
      sorter: true,
      key: 'state',
    },
    {
      title: 'City',
      dataIndex: 'city',
      className: 'leftAlign',
      sorter: true,
      key: 'city',
    },
    {
      title: 'Liebherr Client',
      dataIndex: 'liebherr_client',
      className: 'leftAlign',
      key: 'mobile',
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
      onRowClick={record => showCompanyInfo(record)}
    />
  )
}

export default List
