import Project from '../model/project'
import Relation from '../model/relation'
import ProjectCompany from '../model/project.company'
import {util} from '../utils/index'

export default {
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
  },
  addProject (projectname, userid, cid) {
    return new Promise((resolve, reject) => {
      const create_time = new Date().getTime()
      const str = util.encodeMd5(`${create_time}`)
      Project.set({
        project_id: `${str}`,
        project_name: `${projectname}`,
        created_at: `${create_time}`
      })
      Project.save().then(res => {
        if (res.vals.affectedRows === 1) {
          Promise.all([this.addUserProject(str, userid), this.addProjectCompany(str, cid)]).then(() => {
            resolve()
          }).catch(() => {
            reject()
          })
        } else {
          reject()
        }
      }).catch(res => {
        reject()
      })
    })
  },
  updateProject (name, pid) {
    return new Promise((resolve, reject) => {
      const updated_time = new Date().getTime()
      Project.set({
        project_name: `${name}`,
        updated_at: `${updated_time}`
      })
      Project.save(`project_id="${pid}"`).then(res => {
        if (res.vals.affectedRows === 1) {
          resolve()
        } else {
          reject()
        }
      }).catch(res => {
        reject()
      })
    })
  },
  addUserProject (pid, id) {
    return new Promise((resolve, reject) => {
      Relation.set({
        project_id: `${pid}`,
        user_id: `${id}`
      })
      Relation.save()
      .then(res => {
        if (res.vals.affectedRows === 1) {
          resolve()
        } else {
          reject()
        }
      })
      .catch(res => {
        reject()
      })
    })
  },
  addProjectCompany (pid, cid) {
    return new Promise((resolve, reject) => {
      const create_time = new Date().getTime()
      ProjectCompany.set({
        project_id: `${pid}`,
        company_id: `${cid}`,
        created_at: `${create_time}`
      })
      ProjectCompany.save()
      .then(res => {
        if (res.vals.affectedRows === 1) {
          resolve()
        } else {
          reject()
        }
      })
      .catch(res => {
        reject()
      })
    })
  },
  deleteUserProject (projectid) {
    return new Promise((resolve, reject) => {
      Relation.remove(`project_id="${projectid}"`)
      .then(res => {
        const {vals} = res
        if (vals.affectedRows === 1) {
          resolve()
        } else {
          reject()
        }
      }).catch(() => {
        reject()
      })
    })
  },
  deleteProject (projectid) {
    return new Promise((resolve, reject) => {
      Project.remove(`project_id="${projectid}"`).then(res => {
        const {vals} = res
        if (vals.affectedRows === 1) {
          this.deleteUserProject(projectid).then(() => {
            resolve()
          }).catch(() => {
            reject()
          })
        } else {
          reject()
        }
      }).catch(() => {
        reject()
      })
    })
  },
  getCompanyProject (cid) {
    return new Promise((resolve, reject) => {
      Project.query(`select * from apidoc_project as pr left join apidoc_project_company as upc on pr.project_id=upc.project_id where upc.company_id="${cid}"`)
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
  },
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
}