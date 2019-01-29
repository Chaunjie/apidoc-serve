import TagService from '../service/tagService'
import {mapService} from '../utils/index'

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

    TagService.queryList(projectid)
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

    TagService.queryList(projectid)
    .then(data => TagService.getMenuTag(data))
    .then(data => {
      data = {
        code: 200,
        list: data,
        message: 'success'
      }
      res.json(data)
    })
    .catch(response => {
      res.json(data)
    })
  }

  addTag (req, res) {
    const {tagname, projectid} = req.body
    let data = {
      code: 300,
      message: '新增失败'
    }

    TagService.addTag(projectid, tagname)
    .then(() => {
      data.code = 200
      data.message = 'success'
      res.json(data)
    })
    .catch(() => {
      res.json(data)
    })
  }

  updateTag (req, res) {
    const {tagname, tagid} = req.body
    let data = {
      code: 300,
      message: '修改失败'
    }

    TagService.updateTagById(tagid, tagname).then(() => {
      data.code = 200
      data.message = 'success'
      res.json(data)
    }).catch(() => {
      res.json(data)
    })
  }

  deleteTagById (req, res) {
    const {id} = req.query
    let data = {
      code: 301,
      message: '删除失败'
    }

    TagService.deleteTagById(id).then(() => {
      data.code = 200
      data.message = '删除成功'
      res.json(data)
    }).catch(() => {
      res.json(data)
    })
  }
}