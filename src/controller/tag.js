import Tag from '../model/tag'
import Api from '../model/api'
import {util, mapService} from '../utils/index'

export default class TagController{
  constructor(app) {
    app.post('/tag/add', this.addTag.bind(this))
    app.post('/tag/update', this.updateTag.bind(this))
    app.get('/tag/list', this.getList.bind(this))
    app.get('/tag/menu', this.getMenu.bind(this))
    app.delete('/tag/delete', this.deleteTagById.bind(this))
  }

  getList (req, res) {
    const {projectid} = req.query
    this.queryList(projectid)
    .then(vals => {
      const data = {
        code: 200,
        list: vals.map(mapService.mapTag),
        message: 'success'
      }
      res.json(data)
    })
    .catch(() => {
      const data = {
        code: 300,
        message: 'error'
      }
      res.json(data)
    })
  }

  getMenu (req, res) {
    const {projectid} = req.query
    let data = {
      code: 300,
      message: 'error'
    }
    this.queryList(projectid)
    .then(response => this.getMenuTag(response))
    .then(response => {
      data = {
        code: 200,
        list: response,
        message: 'success'
      }
      res.json(data)
    })
    .catch(response => {
      res.json(data)
    })
  }

  getMenuTag (list) {
    list = list.map(mapService.mapTag)
    const arr = list.map(r => {
      return `"${r.id}"`
    })
    return new Promise((resolve, reject) => {
      if (arr.length) {
        Api.find('all', { where: `sort_id in (${arr.join(', ')})` })
        .then(res => {
          const { vals } = res
          const apiArr = (vals || []).map(mapService.mapApi)
          const newArr = list.map(r => {
            return {
              ...r,
              apiList: apiArr.filter(d => {
                return d.tagId === r.id
              })
            }
          })
          resolve(newArr)
        })
        .catch(res => {
          reject()
        })
      } else {
        const newArr = list.map(r => {
          return {
            ...r,
            apiList: []
          }
        })
        resolve(newArr)
      }
    })
  }

  queryList (projectid) {
    return new Promise((resolve, reject) => {
      Tag.find('all', { where: `project_id="${projectid}"` })
      .then(res => {
        const { vals } = res
        if (vals.length) {
          resolve(vals)
        } else {
          resolve([])
        }
      })
      .catch(res => {
        reject()
      })
    })
  }

  addTag (req, res) {
    const {tagname, projectid} = req.body
    const create_time = new Date().getTime()
    const str = util.encodeMd5(`${create_time}`)
    let data = {
      code: 300,
      message: '新增失败'
    }
    Tag.set({
      sort_id: `${str}`,
      project_id: `${projectid}`,
      sort_name: `${tagname}`,
      created_at: `${create_time}`
    })
    Tag.save()
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

  updateTag (req, res) {
    const {tagname, tagid} = req.body
    const update_time = new Date().getTime()
    let data = {
      code: 300,
      message: '修改失败'
    }
    Tag.set({
      updated_at: `${update_time}`,
      sort_name: `${tagname}`
    })
    Tag.save(`sort_id="${tagid}"`)
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

  deleteTagById (req, res) {
    const {id} = req.query
    let data = {
      code: 301,
      message: '删除失败'
    }
    Tag.remove(`sort_id="${id}"`)
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