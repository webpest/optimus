import React from 'react'
import { Table, Button, Popconfirm } from 'antd'
import { Link } from 'dva/router'

const List = ({ showEquipmentInfo, onUpdate, onDeleteItem, ...tableProps }) => {
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
            onClick={() => showEquipmentInfo(record)}
          />
        </span>
      ),
    },
    {
      title: 'Serial #',
      dataIndex: 'SerialNumber',
      key: 'serialnumber',
      className: 'leftAlign',
      render: (text, record) => (
        <Link to={`/equipment/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'Type',
      className: 'leftAlign',
      key: 'type',
    },
    {
      title: 'Equipment Model',
      dataIndex: 'EquipmentModel',
      className: 'leftAlign',
      key: 'equipmentmodel',
    },
    {
      title: 'Series',
      dataIndex: 'Series',
      className: 'leftAlign',
      key: 'series',
    },
    {
      title: 'Fleet Number',
      dataIndex: 'FleetNumber',
      className: 'leftAlign',
      key: 'fleetnumber',
    },
    {
      title: 'Customer',
      dataIndex: 'Customer',
      className: 'leftAlign',
      key: 'customer',
    },
    {
      title: 'Operator',
      dataIndex: 'Operator',
      className: 'leftAlign',
      key: 'operator',
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
      onRowClick={record => showEquipmentInfo(record)}
    />
  )
}

export default List
