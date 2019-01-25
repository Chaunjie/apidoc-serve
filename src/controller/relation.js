import Relation from '../model/relation'
import {util, mapService} from '../utils/index'

export default class RelationController{
  constructor(app) {
    app.post('/relation/update', this.updateRelations.bind(this))
  }

  updateRelations (req, res) {
    const {list, userid} = req.body
    let data = {
      code: 300,
      message: 'error'
    }
    this.deleteRelation(userid)
    .then(res => this.doUpdate(userid, list))
    .then(() => {
      data = {
        code: 200,
        message: 'success'
      }
      res.json(data)
    })
    .catch(() => {
      res.json(data)
    })
  }

  deleteRelation (userid) {
    return new Promise((resolve, reject) => {
      Relation.remove(`user_id="${userid}"`)
      .then(res => {
        resolve()
      })
      .catch(res => {
        if (res.qerr === 'ERROR: Record not found') {
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  doUpdate (userid, list) {
    return new Promise((resolve, reject) => {
      if (list.length === 0) {
        resolve()
        return
      }
      const records = list.map(r => {
        return {
          project_id: `${r}`,
          user_id: `${userid}`
        }
      })
      Relation.saveAll(records)
      .then(res => {
        if (res.vals.affectedRows === list.length) {
          resolve()
        } else {
          reject()
        }
      })
      .catch(res => {
        reject()
      })
    })
  }
}