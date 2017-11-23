import { request, config } from '../utils'

const { endpoint } = config

export async function query (params) {
  return request({
    url: `${endpoint}/users`,
    method: 'get',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: `${endpoint}/users`,
    method: 'delete',
    data: params,
  })
}
