import Relation from '../model/relation'

export default {
  deleteRelation (userid, list) {
    return new Promise((resolve, reject) => {
      Relation.remove(`user_id="${userid}"`)
      .then(res => {
        if (res.vals.affectedRows >= 1) {
          this.doUpdate(userid, list).then(() => {
            resolve()
          }).catch(() => {
            reject()
          })
        } else {
          reject()
        }
      })
      .catch(res => {
        if (res.qerr === 'ERROR: Record not found') {
          this.doUpdate(userid, list).then(() => {
            resolve()
          }).catch(() => {
            reject()
          })
        } else {
          reject()
        }
      })
    })
  },
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