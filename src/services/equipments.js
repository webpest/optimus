import { request, config } from '../utils'

const { endpoint } = config

export async function fetchEquipments (params) {
  return request({
    url: `${endpoint}/equipments`,
    method: 'get',
    data: params,
  })
}

export async function createEquipment (params) {
  return request({
    url: `${endpoint}/equipments`,
    method: 'post',
    data: params,
  })
}

export async function fetchContacts (params) {
  return request({
    url: `${endpoint}/contact-people`,
    method: 'get',
    data: params,
  })
}

export async function fetchCompanies (params) {
  return request({
    url: `${endpoint}/companies`,
    method: 'get',
    data: params,
  })
}

export async function getEquipment (id, params) {
  return request({
    url: `${endpoint}/equipments/${id}`,
    method: 'get',
    data: params,
  })
}

export async function deleteEquipment (id) {
  return request({
    url: `${endpoint}/equipments/${id}`,
    method: 'delete',
  })
}
