import { message } from 'antd'
import pathToRegexp from 'path-to-regexp'
import { getEquipment } from '../../services/equipments'

export default {
  namespace: 'equipmentDetail',

  state: {},

  reducers: {
    saveEquipmentInfo (state, { equipmentInfo }) {
      return {
        ...state,
        ...equipmentInfo,
      }
    },
  },

  effects: {
    *fetchEquipment ({ payload }, { call, put }) {
      const data = yield call(getEquipment, payload)
      if (data.success) {
        // console.log(data)
        yield put({
          type: 'save',
          equipmentInfo: data.list,
        })
      } else {
        message.error('Error fetching Equipment info')
      }
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        // const status = location.search
        const match = pathToRegexp('/equipment/:id').exec(location.pathname)
        let equipmentId
        if (match) {
          equipmentId = match[1]
          dispatch({
            type: 'fetchEquipment',
            payload: equipmentId,
          })
        }
      })
    },
  },
}
