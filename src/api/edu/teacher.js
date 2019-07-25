import request from '@/utils/request'

const api_name = '/admin/edu/teacher'

export default {

  getPageList(pageNum, pageSize, searchObj) {
    return request({
      url: `${api_name}/${pageNum}/${pageSize}`,
      method: 'get',
      params: searchObj
    })
  },
  save(teacher) { // 新增方法
    return request({
      url: `${api_name}/add`,
      method: 'post',
      data: teacher
    })
  },
  getById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  },
  updateById(teacher) {
    return request({
      url: `${api_name}/${teacher.id}`,
      method: 'put',
      data: teacher
    })
  },
  getList() {
    return request({
      url: `${api_name}/getAll`,
      method: 'get'
    })
  }

}
