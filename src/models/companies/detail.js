import { message } from 'antd'
import pathToRegexp from 'path-to-regexp'
import {
  getCompany,
  getCompanyEquipments,
  getCompanyContacts,
  unAssignContact,
  assignContact,
  fetchContacts,
  fetchEquipments,
  createCompanyNote,
  getCompanyNotes,
  getCompanySites,
  createSite,
  deleteSite,
} from '../../services/company'

export default {
  namespace: 'companyDetail',

  state: {
    equipmentModalVisible: false,
    contactModalVisible: false,
    noteModalVisible: false,
    siteModalVisible: false,
    contactPeople: [],
    equipments: [],
    companies: [],
    notes: [],
    sites: [],
  },

  reducers: {
    saveCompanyInfo (state, { companyInfo }) {
      return {
        ...state,
        ...companyInfo,
      }
    },
    save (state, { payload }) {
      return { ...state, ...payload }
    },
    showEquipmentModal (state) {
      return { ...state, equipmentModalVisible: true }
    },
    hideEquipmentModal (state) {
      return { ...state, equipmentModalVisible: false }
    },
    showContactModal (state) {
      return { ...state, contactModalVisible: true }
    },
    hideContactModal (state) {
      return { ...state, contactModalVisible: false }
    },
    showNoteModal (state) {
      return { ...state, noteModalVisible: true }
    },
    hideNoteModal (state) {
      return { ...state, noteModalVisible: false }
    },
    showSiteModal (state) {
      return { ...state, siteModalVisible: true }
    },
    hideSiteModal (state) {
      return { ...state, siteModalVisible: false }
    },
  },

  effects: {
    *fetchCompany ({ payload }, { call, put }) {
      const data = yield call(getCompany, payload)
      if (data.success) {
        yield put({
          type: 'saveCompanyInfo',
          companyInfo: data,
        })
      } else {
        message.error('Error fetching Company info')
      }
    },
    *unAssignContact ({ payload }, { call, put }) {
      const companyId = payload.companyId
      const contactId = payload.contactId
      const data = yield call(unAssignContact, companyId, contactId)
      if (data.success) {
        yield put({
          type: 'getCompanyContacts',
          payload: companyId,
        })
        message.success(data.msg)
      }
    },
    *assignContact ({ payload }, { call, put }) {
      const companyId = payload.company_id
      const contactId = payload.contact_person
      console.log(companyId, contactId)
      const data = yield call(assignContact, companyId, contactId)
      if (data.success) {
        console.log(data)
        yield put({ type: 'hideContactModal' })
        yield put({
          type: 'getCompanyContacts',
          payload: companyId,
        })
        message.success(data.msg)
      }
    },

    *createNote ({ payload }, { call, put }) {
      const companyId = payload.company_id
      const data = yield call(createCompanyNote, companyId, payload)
      if (data) {
        yield put({ type: 'hideNoteModal' })
        yield put({
          type: 'getCompanyNotes',
          payload: companyId,
        })
        message.success(data.msg)
      }
    },
    *getCompanyEquipments ({ payload }, { call, put }) {
      const data = yield call(getCompanyEquipments, payload)
      if (data.success) {
        yield put({
          type: 'save',
          payload: {
            equipments: data.list,
          },
        })
      } else {
        message.error('Error fetching Company Equipment info')
      }
    },
    *getCompanyContacts ({ payload }, { call, put }) {
      const data = yield call(getCompanyContacts, payload)
      if (data.success) {
        console.log(data)
        yield put({
          type: 'save',
          payload: {
            contacts: data.list,
          },
        })
      } else {
        message.error('Error fetching Company Contacts info')
      }
    },
    *getCompanyNotes ({ payload }, { call, put }) {
      const data = yield call(getCompanyNotes, payload)
      if (data.success) {
        console.log(data)
        yield put({
          type: 'save',
          payload: {
            notes: data.list,
          },
        })
      } else {
        message.error('Error fetching Company Notes')
      }
    },
    *getCompanySites ({ payload }, { call, put }) {
      const data = yield call(getCompanySites, payload)
      if (data.success) {
        console.log(data)
        yield put({
          type: 'save',
          payload: {
            sites: data.list,
          },
        })
      } else {
        message.error('Error fetching Company Sites')
      }
    },
    *createSite ({ payload }, { call, put }) {
      const companyId = payload.company_id
      const data = yield call(createSite, companyId, payload)
      if (data) {
        yield put({ type: 'hideSiteModal' })
        yield put({
          type: 'getCompanySites',
          payload: companyId,
        })
        message.success(data.msg)
      }
    },
    *deleteSite ({ payload }, { call, put }) {
      const companyId = payload.companyId
      const siteId = payload.siteId
      const data = yield call(deleteSite, companyId, siteId)
      if (data.success) {
        yield put({
          type: 'getCompanySites',
          payload: companyId,
        })
        message.success(data.msg)
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
    *fetchEquipments ({ payload = {} }, { call, put }) {
      const data = yield call(fetchEquipments, payload)
      console.log(data)
      if (data.success) {
        yield put({
          type: 'save',
          payload: {
            equipments: data.list,
          },
        })
      } else {
        message.error('Error fetching Equipments')
      }
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const status = location.search
        const match = pathToRegexp('/company/:id').exec(location.pathname)
        let companyId
        if (match) {
          companyId = match[1]
          dispatch({
            type: 'fetchCompany',
            payload: companyId,
          })

          dispatch({
            type: 'fetchContacts',
          })

          dispatch({
            type: 'fetchEquipments',
          })
        }
        if (status === '?status=3') {
          dispatch({
            type: 'getCompanyEquipments',
            payload: companyId,
          })
        }
        if (status === '?status=2') {
          dispatch({
            type: 'getCompanyContacts',
            payload: companyId,
          })
        }
        if (status === '?status=9') {
          dispatch({
            type: 'getCompanyNotes',
            payload: companyId,
          })
        }
        if (status === '?status=8') {
          dispatch({
            type: 'getCompanySites',
            payload: companyId,
          })
        }
      })
    },
  },
}
