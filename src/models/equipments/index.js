import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import {
  fetchEquipments,
  getEquipment,
  createEquipment,
  fetchContacts,
  fetchCompanies,
} from '../../services/equipments'
import { pageModel } from '../common'
import { config } from '../../utils'

export default modelExtend(pageModel, {
  namespace: 'equipments',
  state: {
    modalVisible: false,
    equipmentInfoVisible: false,
    modalType: 'create',
    currentItem: {},
    contactPeople: [],
    companySites: [],
    companies: [],
  },
  reducers: {
    save (state, { payload }) {
      return { ...state, ...payload }
    },
    saveContact (state, { contactPeople }) {
      return { ...state, ...contactPeople }
    },
    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    equipmentInfo (state, { payload }) {
      return {
        ...state,
        ...payload,
        equipmentInfoVisible: true,
      }
    },
    hideEquipmentInfo (state, { payload }) {
      return {
        ...state,
        ...payload,
        equipmentInfoVisible: false,
      }
    },
  },
  effects: {
    *query ({ payload = {} }, { call, put }) {
      const data = yield call(fetchEquipments, payload)
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
        message.error('Error fetching Equipments')
      }
    },
    *create ({ payload }, { call, put }) {
      const data = yield call(createEquipment, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
        message.success('Equipment created successfully')
      } else {
        message.error('Equipment cannot be created')
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
    *fetchCompanies ({ payload = {} }, { call, put }) {
      const data = yield call(fetchCompanies, payload)

      if (data.success) {
        // console.log(data)
        yield put({
          type: 'save',
          payload: {
            companies: data.list,
          },
        })
      } else {
        message.error('Error fetching Companies')
      }
    },
    // *deleteById ({ payload }, { call, put }) {
    //   const data = yield call(deleteCompany, payload)
    //   if (data.success) {
    //     console.log('Item Deleted')
    //     yield put()
    //   } else {
    //     message.error('Company can not be deleted')
    //   }
    // },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/equipment') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },
})
