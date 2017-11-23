import React from 'react'
import { Table, Button, Popconfirm, Row, Col } from 'antd'
import { connect } from 'dva'
import { Link } from 'dva/router'

import Modal from '../components/SiteModal'

const Sites = ({ companyDetail, dispatch, loading, createSite }) => {
  const { sites, siteModalVisible, id } = companyDetail

  const deleteSite = (companyId, siteId) => {
    dispatch({
      type: 'companyDetail/deleteSite',
      payload: {
        companyId,
        siteId,
      },
    })
  }
  const modalProps = {
    // item: modalType === 'create' ? {} : currentItem,
    companyId: id,
    visible: siteModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['companies/update'],
    title: 'New Sites',
    okText: 'Create',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'companyDetail/createSite',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'companyDetail/hideSiteModal',
      })
    },
  }
  const columns = [
    {
      title: 'Site Name',
      dataIndex: 'site_name',
      key: 'site_name',
      className: 'leftAlign',
    },
    {
      title: 'Site State',
      dataIndex: 'site_state',
      className: 'leftAlign',
      key: 'site_state',
    },
    {
      title: 'Site City',
      dataIndex: 'site_city',
      className: 'leftAlign',
      sorter: true,
      key: 'site_city',
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
            onConfirm={() => deleteSite(record.company_id, record.id)}
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
                onClick={createSite}
              >
                Create new Site
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Table
        dataSource={sites}
        columns={columns}
        rowKey={record => record.id}
        bordered
      />
      {siteModalVisible && <Modal {...modalProps} />}
    </div>
  )
}

export default connect(({ companyDetail, loading }) => ({
  companyDetail,
  loading,
}))(Sites)
