import { get,post } from './request.js'

module.exports = {
  add: function (params) {
    return post(`/advert/add`,params)
  },
  getAdvertList: function (params) {
    return post(`/advert/getList`,params)
  },
  update: function (params) {
    return post(`/advert/getList`,params)
  },
  getOne: function (id = 0) {
    return get(`/advert/getOne?id=${id}`)
  },
  delete: function (id = 0) {
    return get(`/advert/delete?id=${id}`)
  }
}