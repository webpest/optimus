import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import queryString from 'query-string'
import {
  fetchCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
  createCompany,
  fetchContacts,
} from '../../services/company'
import { pageModel } from '../common'
import { config } from '../../utils'

export default modelExtend(pageModel, {
  namespace: 'companies',
  state: {
    modalVisible: false,
    companyInfoVisible: false,
    modalType: 'create',
    currentItem: {},
    contactPeople: [],
  },
  reducers: {
    save (state, { payload }) {
      return { ...state, ...payload }
    },
    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    companyInfo (state, { payload }) {
      return {
        ...state,
        ...payload,
        companyInfoVisible: true,
      }
    },
    hideCompanyInfo (state, { payload }) {
      return {
        ...state,
        ...payload,
        companyInfoVisible: false,
      }
    },
  },
  effects: {
    *query ({ payload = {} }, { call, put }) {
      const data = yield call(fetchCompanies, payload)
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.list,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      } else {
        message.error('Error fetching Companies')
      }
    },

    *create ({ payload }, { call, put }) {
      const data = yield call(createCompany, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
        message.success('Company created successfully')
      } else {
        message.error('Company cannot be created')
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ companies }) => companies.currentItem.id)
      const data = yield call(updateCompany, id, payload)
      if (data) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
        message.success('Company updated successfully')
      } else {
        message.error('Error updating Company')
      }
    },

    *deleteById ({ payload }, { call, put }) {
      const data = yield call(deleteCompany, payload)
      if (data.success) {
        message.success('Company Deleted')
        yield put({ type: 'query' })
      } else {
        message.error('Company can not be deleted')
      }
    },

    *fetchContacts ({ payload = {} }, { call, put }) {
      const data = yield call(fetchContacts, payload)

      if (data.success) {
        yield put({
          type: 'save',
          payload: {
            contactPeople: data.list,
          },
        })
      } else {
        message.error('Error fetching Contacts')
      }
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/company') {
          dispatch({
            type: 'query',
            payload: {
              status: 2,
              ...queryString.parse(location.search),
            },
          })
        }
      })
    },
  },
})
