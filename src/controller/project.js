import Project from '../model/project'
import Relation from '../model/relation'
import {util, mapService} from '../utils/index'

export default class ProjectController{
  constructor(app) {
    app.post('/project/add', this.addProject.bind(this))
    app.get('/project/list', this.getList.bind(this))
    app.get('/project/querylist', this.getUserProjectList.bind(this))
    app.delete('/project/delete', this.deleteProject.bind(this))
  }

  getUserProjectList (req, res) {
    const {userid} = req.query
    Promise.all([this.queryList(), this.queryUserList(userid)])
    .then(response => {
      const data = {
        code: 200,
        list: response[0].map(mapService.mapProject),
        checkedList: response[1].map((r) => {return r.project_id}),
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

  queryList () {
    return new Promise((resolve, reject) => {
      Project.find('all')
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

  getList (req, res) {
    const {userid} = req.query
    this.queryUserList(userid)
    .then(vals => {
      const data = {
        code: 200,
        list: vals.map(mapService.mapProject),
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

  queryUserList (userid) {
    return new Promise((resolve, reject) => {
      Project.query(`select * from apidoc_project as pr left join apidoc_user_project as upr on pr.project_id=upr.project_id where upr.user_id="${userid}"`)
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

  addProject (req, res) {
    const {projectname, userid} = req.body
    const create_time = new Date().getTime()
    const str = util.encodeMd5(`${create_time}`)
    Project.set({
      project_id: `${str}`,
      project_name: `${projectname}`,
      created_at: `${create_time}`
    })
    Project.save()
    .then(() => this.addUserProject(str, userid))
    .then(() => {
      const data = {
        code: 200,
        message: 'success'
      }
      res.json(data)
    })
    .catch(response => {
      const data = {
        code: 300,
        message: '新增失败'
      }
      res.json(data)
    })
  }

  addUserProject (pid, id) {
    return new Promise((resolve, reject) => {
      Relation.set({
        project_id: `${pid}`,
        user_id: `${id}`
      })
      Relation.save()
      .then(response => {
        resolve()
      })
      .catch(response => {
        reject()
      })
    })
  }

  deleteProject (req, res) {
    const {projectid} = req.query
    let data = {
      code: 301,
      message: '删除失败'
    }
    Project.remove(`project_id="${projectid}"`)
    .then(() => this.deleteUserProject(projectid))
    .then(response => {
      data = {
        code: 200,
        message: '删除成功'
      }
      res.json(data)
    })
    .catch(response => {
      res.json(data)
    })
  }

  deleteUserProject (projectid) {
    return new Promise((resolve, reject) => {
      Relation.remove(`project_id="${projectid}"`)
      .then(res => {
        const {vals} = res
        if (vals.affectedRows === 1) {
          resolve()
        }
      }).catch(() => {
        reject()
      })
    })
  }
}