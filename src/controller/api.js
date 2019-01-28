import ApiService from '../service/apiService'
import {mapService} from '../utils/index'

export default class ApiController {
  constructor(app) {
    app.get('/api/get', this.getApi)
    app.post('/api/add', this.addApi.bind(this))
    app.post('/api/update', this.updateApi)
    app.delete('/api/delete', this.deleteApiById)
  }

  getApi (req, res) {
    const {id} = req.query
    let data = {
      code: 300,
      message: 'error'
    }

    ApiService.getApiById(id).then(vals => {
      data = {
        code: 200,
        apiInfo: mapService.mapApi(vals[0] || {}),
        message: 'success'
      }
      res.json(data)
    }).catch(data => {
      res.json(data)
    })
  }

  addApi (req, res) {
    const {apiname, tagid, projectid, mdcontent, htmlcontent} = req.body
    const create_time = new Date().getTime()
    let data = {
      code: 300,
      message: '新增失败'
    }

    ApiService.addApi(create_time, apiname, tagid, projectid, mdcontent, htmlcontent)
    .then(response => {
      data = {
        code: 200,
        id: response,
        message: 'success'
      }
      res.json(data)
    })
    .catch(response => {
      res.json(data)
    })
  }

  updateApi (req, res) {
    let {apiname, tagid, mdcontent, htmlcontent, id} = req.body
    const update_time = new Date().getTime()
    let data = {
      code: 300,
      message: '修改失败'
    }
    ApiService.updateApiById(tagid, apiname, mdcontent, htmlcontent, id).then(() => {
      data.message = 'success'
      data.code = 200
      res.json(data)
    }).catch(() => {
      res.json(data)
    })
  }

  deleteApiById (req, res) {
    const {id} = req.query
    let data = {
      code: 301,
      message: '删除失败'
    }
    ApiService.removeApiById(id).then(() => {
      data.code = 200
      data.message = '删除成功'
      res.json(data)
    }).catch(() => {
      res.json(data)
    })
  }
}