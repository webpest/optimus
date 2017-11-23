import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import Animate from 'rc-animate'
import Modal from './components/Modal'
import Filter from './components/Filter'
import List from './components/List'
import CompanyInfo from './components/CompanyInfo'

import './index.less'

const Company = ({ companies, dispatch, loading, location }) => {
  const {
    list,
    modalVisible,
    companyInfoVisible,
    modalType,
    currentItem,
    pagination,
    contactPeople,
  } = companies
  // const { pageSize } = pagination
  const modalProps = {
    contacts: contactPeople,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    width: 700,
    maskClosable: false,
    confirmLoading: loading.effects['companies/update'],
    title: `${modalType === 'create' ? 'Create Company' : 'Update Company'}`,
    okText: `${modalType === 'create' ? 'Create Company' : 'Update Company'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `companies/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'companies/hideModal',
      })
    },
  }
  const listProps = {
    dataSource: list,
    loading: loading.effects['companies/query'],
    pagination,
    location,
    onUpdate (item) {
      dispatch({
        type: 'companies/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    showCompanyInfo (item) {
      dispatch({
        type: 'companies/companyInfo',
        payload: {
          currentItem: item,
        },
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'companies/deleteById',
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
        type: 'companies/showModal',
        payload: {
          modalType: 'create',
        },
      })

      dispatch({
        type: 'companies/fetchContacts',
      })
    },
  }

  const companyProps = {
    info: currentItem,
    visible: companyInfoVisible,
    hideCompany () {
      dispatch({
        type: 'companies/hideCompanyInfo',
        payload: {
          currentItem: {},
        },
      })
    },
  }

  return (
    <div className="content-inner">
      {companyInfoVisible && (
        <Animate>
          <CompanyInfo {...companyProps} />
        </Animate>
      )}
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

export default connect(({ companies, loading }) => ({ companies, loading }))(
  Company
)
