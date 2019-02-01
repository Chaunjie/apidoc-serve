import ProjectService from '../service/project.service'
import { getProjectList, needLogin, needCompany, needProject, needProjectName } from '../service/verify.service'
import {mapService} from '../utils/index'

export default class ProjectController{
  constructor(app) {
    app.post('/project/add', this.addProject.bind(this))
    app.get('/project/list', this.getList.bind(this))
    app.get('/project/querylist', this.getUserProjectList.bind(this))
    app.delete('/project/delete', this.deleteProject.bind(this))
  }

  @needLogin
  @needCompany
  getUserProjectList (req, res) {
    const {userid, companyid} = req.query
    Promise.all([ProjectService.getCompanyProject(companyid), ProjectService.queryUserList(userid)])
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

  @needLogin
  getList (req, res) {
    const {userid} = req.query
    ProjectService.queryUserList(userid)
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

  @needLogin
  @needCompany
  @needProjectName
  addProject (req, res) {
    const {projectname, userid, companyid} = req.body
    ProjectService.addProject(projectname, userid, companyid).then(() => {
      const data = {
        code: 200,
        message: 'success'
      }
      res.json(data)
    }).catch(() => {
      const data = {
        code: 300,
        message: '新增失败'
      }
      res.json(data)
    })
  }

  @needProject
  deleteProject (req, res) {
    const {projectid} = req.query
    let data = {
      code: 301,
      message: '删除失败'
    }
    ProjectService.deleteProject(projectid).then(() => {
      data = {
        code: 200,
        message: '删除成功'
      }
      res.json(data)
    }).catch(() => {
      res.json(data)
    })
  }
}