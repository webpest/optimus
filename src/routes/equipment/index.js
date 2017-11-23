import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import Animate from 'rc-animate'
import { Upload, Button, Icon, message } from 'antd'
import Modal from './components/Modal'
import Filter from './components/Filter'
import List from './components/List'
import EquipmentInfo from './components/EquipmentInfo'

import './index.less'

const Equipment = ({ equipments, dispatch, loading, location }) => {
  const {
    list,
    modalVisible,
    modalType,
    currentItem,
    pagination,
    equipmentInfoVisible,
    contactPeople,
    companies,
    companySites,
  } = equipments
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    contacts: contactPeople,
    companies,
    companySites,
    visible: modalVisible,
    maskClosable: false,
    title: `${modalType === 'create'
      ? 'Create Equipment'
      : 'Update Equipment'}`,
    okText: `${modalType === 'create'
      ? 'Create Equipment'
      : 'Update Equipment'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      console.log(data)
      dispatch({
        type: `equipments/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'equipments/hideModal',
      })
    },
    fetchSites (key) {
      dispatch({
        type: 'equipments/fetchSites',
        payload: {
          key,
        },
      })
    },
  }
  const listProps = {
    dataSource: list,
    loading: loading.effects['equipments/query'],
    pagination,
    location,
    onUpdate (item) {
      dispatch({
        type: 'equipments/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    showEquipmentInfo (item) {
      dispatch({
        type: 'equipments/equipmentInfo',
        payload: {
          currentItem: item,
        },
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'equipments/deleteById',
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
        type: 'equipments/showModal',
        payload: {
          modalType: 'create',
        },
      })
      dispatch({
        type: 'equipments/fetchContacts',
      })
      dispatch({
        type: 'equipments/fetchCompanies',
      })
    },
  }
  const equipmentProps = {
    info: currentItem,
    visible: equipmentInfoVisible,
    hideEquipment () {
      dispatch({
        type: 'equipments/hideEquipmentInfo',
        payload: {
          currentItem: {},
        },
      })
    },
  }
  return (
    <div className="content-inner">
      {equipmentInfoVisible && (
        <Animate>
          <EquipmentInfo {...equipmentProps} />
        </Animate>
      )}
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

export default connect(({ equipments, loading }) => ({
  equipments,
  loading,
}))(Equipment)
