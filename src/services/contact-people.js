import { request, config } from '../utils'

const { endpoint } = config

export async function fetchContacts (params) {
  return request({
    url: `${endpoint}/contact-people`,
    method: 'get',
    data: params,
  })
}

export async function createContact (params) {
  return request({
    url: `${endpoint}/contact-people`,
    method: 'post',
    data: params,
  })
}

export async function updateContact (id, params) {
  return request({
    url: `${endpoint}/contact-people/${id}`,
    method: 'put',
    data: params,
  })
}

export async function getContact (id, params) {
  return request({
    url: `${endpoint}/contact-people/${id}`,
    method: 'get',
    data: params,
  })
}

export async function deleteContact (id) {
  return request({
    url: `${endpoint}/contact-people/${id}`,
    method: 'delete',
  })
}
