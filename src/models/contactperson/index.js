import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import queryString from 'query-string'
import {
  fetchContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} from '../../services/contact-people'
import { pageModel } from '../common'
import { config } from '../../utils'

export default modelExtend(pageModel, {
  namespace: 'contactPeople',
  state: {
    modalVisible: false,
    personInfoVisible: false,
    modalType: 'create',
    currentItem: {},
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
    personInfo (state, { payload }) {
      return {
        ...state,
        ...payload,
        personInfoVisible: true,
      }
    },
    hidePersonInfo (state, { payload }) {
      return {
        ...state,
        ...payload,
        personInfoVisible: false,
      }
    },
  },
  effects: {
    *query ({ payload = {} }, { call, put }) {
      const data = yield call(fetchContacts, payload)
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
        message.error('Error fetching Contacts')
      }
    },
    *create ({ payload }, { call, put }) {
      const data = yield call(createContact, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
        message.success('Contact Person created successfully')
      } else {
        message.error('Contact Person cannot be created')
      }
    },
    *update ({ payload }, { select, call, put }) {
      const id = yield select(
        ({ contactPeople }) => contactPeople.currentItem.id
      )
      const data = yield call(updateContact, id, payload)
      if (data) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
        message.success('Contact Person updated successfully')
      } else {
        message.error('Error updating Contact Person')
      }
    },
    *deleteById ({ payload }, { call, put }) {
      const data = yield call(deleteContact, payload)
      if (data.success) {
        message.success('Contact Deleted')
        yield put({ type: 'query' })
      } else {
        message.error('Contact can not be deleted')
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/contact-person') {
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
