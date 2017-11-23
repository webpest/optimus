import React from 'react'
import { Row, Col, Button, Timeline, Popconfirm } from 'antd'
import { connect } from 'dva'

import Modal from '../components/noteModal'

const Notes = ({ companyDetail, dispatch, loading, createNote }) => {
  const { equipments, noteModalVisible, id, notes } = companyDetail
  const modalProps = {
    companyId: id,
    // item: modalType === 'create' ? {} : currentItem,
    visible: noteModalVisible,
    width: 700,
    maskClosable: false,
    confirmLoading: loading.effects['companies/update'],
    title: 'New Note',
    okText: 'Create New Note',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'companyDetail/createNote',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'companyDetail/hideNoteModal',
      })
    },
  }

  const noteList = notes.map(note => {
    return (
      <Timeline.Item key={note.id}>
        <p>
          {note.title} | {note.created_at}
        </p>
        <p>{note.note}</p>
      </Timeline.Item>
    )
  })
  return (
    <div>
      <Row>
        <Col style={{ marginBottom: '16px' }}>
          <Row>
            <Col span={12}>
              <h2>Notes</h2>
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
                onClick={createNote}
              >
                Create a new Note
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Timeline>{noteList}</Timeline>
        </Col>
      </Row>
      {noteModalVisible && <Modal {...modalProps} />}
    </div>
  )
}

export default connect(({ companyDetail, loading }) => ({
  companyDetail,
  loading,
}))(Notes)
