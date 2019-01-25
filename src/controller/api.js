import Api from '../model/api'
import {util, mapService} from '../utils/index'

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
    Api.find('all', { where: `api_id="${id}"` })
    .then(response => {
      const { vals } = response
      data = {
        code: 200,
        apiInfo: mapService.mapApi(vals[0] || {}),
        message: 'success'
      }
      res.json(data)
    })
    .catch(response => {
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
    this.add(create_time, apiname, tagid, projectid, mdcontent, htmlcontent)
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

  add (create_time, apiname, tagid, projectid, mdcontent, htmlcontent) {
    const str = util.encodeMd5(`${create_time}`)
    return new Promise((resolve, reject) => {
      Api.set({
        api_id: str,
        sort_id: tagid,
        project_id: projectid,
        api_name: apiname,
        api_edit_content: mdcontent,
        api_show_content: htmlcontent,
        created_at: `${create_time}`
      })
      Api.save()
      .then(response => {
        if (response.vals.affectedRows === 1) {
          resolve(str)
        } else {
          reject()
        }
      })
      .catch(response => {
        reject()
      })
    })
  }

  updateApi (req, res) {
    let {apiname, tagid, mdcontent, htmlcontent, id} = req.body
    const update_time = new Date().getTime()
    let data = {
      code: 300,
      message: '修改失败'
    }
    Api.set({
      sort_id: tagid,
      api_name: apiname,
      api_edit_content: mdcontent,
      api_show_content: htmlcontent,
      updated_at: `${update_time}`
    })
    Api.save(`api_id="${id}"`)
    .then(response => {
      if (response.vals.affectedRows === 1) {
         data = {
          code: 200,
          message: 'success'
        }
      }
      res.json(data)
    })
    .catch(response => {
      res.json(data)
    })
  }

  deleteApiById (req, res) {
    const {id} = req.query
    let data = {
      code: 301,
      message: '删除失败'
    }
    Api.remove(`api_id="${id}"`)
    .then(response => {
      if (response.vals.affectedRows === 1) {
        data = {
          code: 200,
          message: '删除成功'
        }
      }
      res.json(data)
    })
    .catch(response => {
      res.json(data)
    })
  }
}