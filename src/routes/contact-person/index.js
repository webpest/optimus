import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import Animate from 'rc-animate'
import { Upload, Button, Icon, message } from 'antd'
import Modal from './components/Modal'
import Filter from './components/Filter'
import List from './components/List'
import PersonInfo from './components/PersonInfo'

import './index.less'

const ContactPerson = ({ contactPeople, dispatch, loading, location, app }) => {
  console.log(app)
  const {
    list,
    modalVisible,
    modalType,
    currentItem,
    pagination,
    personInfoVisible,
  } = contactPeople
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    width: 700,
    title: `${modalType === 'create' ? 'Create Contact' : 'Update Contact'}`,
    okText: `${modalType === 'create' ? 'Create Contact' : 'Update Contact'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `contactPeople/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'contactPeople/hideModal',
      })
    },
  }
  const listProps = {
    dataSource: list,
    loading: loading.effects['contactPeople/query'],
    pagination,
    location,
    onUpdate (item) {
      dispatch({
        type: 'contactPeople/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    showContactInfo (item) {
      dispatch({
        type: 'contactPeople/personInfo',
        payload: {
          currentItem: item,
        },
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'contactPeople/deleteById',
        payload: id,
      })
    },
    onChange (page) {
      const { query, pathname } = location
      dispatch(
        routerRedux.push({
          pathname,
          query: {
            ...query,
            page: page.current,
            pageSize: page.pageSize,
          },
        })
      )
    },
  }
  const filterProps = {
    onAdd () {
      dispatch({
        type: 'contactPeople/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
  }
  const personProps = {
    info: currentItem,
    visible: personInfoVisible,
    hidePerson () {
      dispatch({
        type: 'contactPeople/hidePersonInfo',
        payload: {
          currentItem: {},
        },
      })
    },
  }

  return (
    <div className="content-inner">
      {personInfoVisible && (
        <Animate>
          <PersonInfo {...personProps} />
        </Animate>
      )}
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

export default connect(({ contactPeople, loading, app }) => ({
  contactPeople,
  loading,
  app,
}))(ContactPerson)
