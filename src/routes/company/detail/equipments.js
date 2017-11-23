import React from 'react'
import { Table, Button, Popconfirm, Row, Col } from 'antd'
import { connect } from 'dva'

import Modal from '../components/EquipmentModal'

const Equipments = ({
  companyDetail,
  dispatch,
  loading,
  assignEquipment,
  unAssignEquipment,
}) => {
  const { equipments, equipmentModalVisible } = companyDetail

  const modalProps = {
    // item: modalType === 'create' ? {} : currentItem,
    equipment_list: equipments,
    visible: equipmentModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['companies/update'],
    title: 'Assign Equipments',
    okText: 'Assign Equipment',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      //
    },
    onCancel () {
      dispatch({
        type: 'companyDetail/hideEquipmentModal',
      })
    },
  }

  const columns = [
    {
      title: 'Serial #',
      dataIndex: 'SerialNumber',
      key: 'serialnumber',
      className: 'leftAlign',
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
          <Popconfirm
            title="Are you sure you want to unassign this？"
            okText="Yes"
            cancelText="No"
            placement="left"
            onConfirm={() => unAssignEquipment(record.id)}
          >
            <Button icon="delete" type="danger" size="small">
              Unasign
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ]
  return (
    <div>
      <Row>
        <Col style={{ marginBottom: '16px' }}>
          <Row>
            <Col span={12} />
            <Col span={4} offset={8} style={{ textAlign: 'right' }}>
              <Button
                size="large"
                type="primary"
                icon="plus"
                onClick={assignEquipment}
              >
                Assign new Equipment
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Table
        dataSource={equipments}
        columns={columns}
        rowKey={record => record.id}
        bordered
      />
      {equipmentModalVisible && <Modal {...modalProps} />}
    </div>
  )
}

export default connect(({ companyDetail, loading }) => ({
  companyDetail,
  loading,
}))(Equipments)
