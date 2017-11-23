import { request, config } from '../utils'

const { endpoint } = config

export async function fetchCompanies (params) {
  return request({
    url: `${endpoint}/companies`,
    method: 'get',
    data: params,
  })
}

export async function createCompany (params) {
  return request({
    url: `${endpoint}/companies`,
    method: 'post',
    data: params,
  })
}

export async function createCompanyNote (id, params) {
  return request({
    url: `${endpoint}/companies/${id}/note`,
    method: 'post',
    data: {
      title: params.title,
      note: params.note,
    },
  })
}

export async function getCompany (id, params) {
  return request({
    url: `${endpoint}/companies/${id}`,
    method: 'get',
    data: params,
  })
}

export async function getCompanyEquipments (id, params) {
  return request({
    url: `${endpoint}/companies/${id}/assigned-equipments`,
    method: 'get',
    data: params,
  })
}

export async function getCompanyContacts (id) {
  return request({
    url: `${endpoint}/companies/${id}/assigned-contacts`,
    method: 'get',
  })
}

export async function getCompanyNotes (id, params) {
  return request({
    url: `${endpoint}/companies/${id}/notes`,
    method: 'get',
    data: params,
  })
}

export async function getCompanySites (id, params) {
  return request({
    url: `${endpoint}/companies/${id}/sites`,
    method: 'get',
    data: params,
  })
}

export async function createSite (id, params) {
  return request({
    url: `${endpoint}/companies/${id}/site`,
    method: 'post',
    data: params,
  })
}

export async function deleteSite (companyId, siteId) {
  return request({
    url: `${endpoint}/companies/${companyId}/sites/${siteId}`,
    method: 'delete',
  })
}

export async function unAssignContact (companyId, contactId) {
  return request({
    url: `${endpoint}/companies/${companyId}/unassigned-contact/${contactId}`,
    method: 'delete',
  })
}
export async function assignContact (companyId, contactId) {
  return request({
    url: `${endpoint}/companies/${companyId}/assign-contact/${contactId}`,
    method: 'post',
  })
}

export async function updateCompany (id, params) {
  return request({
    url: `${endpoint}/companies/${id}`,
    method: 'put',
    data: params,
  })
}

export async function deleteCompany (id) {
  return request({
    url: `${endpoint}/companies/${id}`,
    method: 'delete',
  })
}

export async function fetchContacts (params) {
  return request({
    url: `${endpoint}/contact-people`,
    method: 'get',
    data: params,
  })
}

export async function fetchEquipments (params) {
  return request({
    url: `${endpoint}/equipments`,
    method: 'get',
    data: params,
  })
}
