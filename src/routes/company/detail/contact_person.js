import React from 'react'
import { Table, Button, Popconfirm, Row, Col } from 'antd'
import { connect } from 'dva'
import { Link } from 'dva/router'

import Modal from '../components/ContactModal'

const ContactPerson = ({
  companyDetail,
  dispatch,
  loading,
  assignContact,
  unAssignContact,
}) => {
  const { contacts, contactModalVisible, contactPeople, id } = companyDetail

  const modalProps = {
    // item: modalType === 'create' ? {} : currentItem,
    companyId: id,
    contacts: contactPeople,
    visible: contactModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['companies/update'],
    title: 'Assign Contacts',
    okText: 'Assign Contact',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'companyDetail/assignContact',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'companyDetail/hideContactModal',
      })
    },
  }
  const columns = [
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
          <Popconfirm
            title="Are you sure you want to delete？"
            okText="Yes"
            cancelText="No"
            placement="left"
            onConfirm={() =>
              unAssignContact(
                record.pivot.company_id,
                record.pivot.contactperson_id
              )}
          >
            <Button icon="delete" type="danger" size="small">
              Unassign
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
            <Col span={12}>
              {/* <AutoComplete
                size="large"
                style={{ width: 300 }}
                placeholder="type here to search"
              >
                <Input
                  suffix={
                    <Icon type="search" className="certain-category-icon" />
                  }
                />
              </AutoComplete> */}
            </Col>
            <Col span={4} offset={8} style={{ textAlign: 'right' }}>
              <Button
                size="large"
                type="primary"
                icon="plus"
                onClick={assignContact}
              >
                Assign new Contact
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Table
        dataSource={contacts}
        columns={columns}
        rowKey={record => record.id}
        bordered
      />
      {contactModalVisible && <Modal {...modalProps} />}
    </div>
  )
}

export default connect(({ companyDetail, loading }) => ({
  companyDetail,
  loading,
}))(ContactPerson)
