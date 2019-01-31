import User from '../model/user'
import {util} from '../utils/index'

export default {
  getCompanyUserById (companyid) {
    return new Promise((resolve, reject) => {
      User.query(`select * from apidoc_user as pu left join apidoc_user_company as upc on pu.user_id=upc.user_id where upc.company_id="${companyid}"`).then(res => {
        let {vals} = res
        resolve(vals || [])
      }).catch(res => {
        reject()
      })
    })
  },
  getList () {
    return new Promise((resolve, reject) => {
      User.find('all').then(res => {
        let {vals} = res
        vals = vals.filter(r => {
          return r.id !== 1
        })
        resolve(vals)
      }).catch(res => {
        reject()
      })
    })
  },
  deleteUser (userid) {
    return new Promise((resolve, reject) => {
      User.remove(`user_id="${userid}"`)
      .then(res => {
        const {vals} = res
        if (vals.affectedRows === 1) {
          resolve()
        } else {
          reject()
        }
      }).catch(res => {
        reject()
      })
    })
  },
  checkUserByNamePwd (username, password) {
    return new Promise((resolve, reject) => {
      const str = util.encodeMd5(password)
      User.find('all', { where: `user_username="${username}" and user_password="${str}"` })
      .then(res => {
        const {vals} = res
        if (vals.length) {
          resolve(vals)
        } else {
          reject()
        }
      }).catch(res => {
        reject()
      })
    })
  },
  getUserByName (name) {
    return new Promise((resolve, reject) => {
      User.find('all', { where: `user_username="${name}"` })
      .then(res => {
        const {vals} = res
        resolve(vals)
      }).catch(res => {
        console.log('error')
      })
    })
  },
  getLastId () {
    return new Promise((resolve, reject) => {
      User.find('all', { fields: ['max(id)'] })
      .then(res => {
        const {vals} = res
        resolve(vals)
      }).catch(res => {
        console.log('error')
      })
    })
  },
  updateById (password, userid) {
    return new Promise((resolve, reject) => {
      const str = util.encodeMd5(`${password}`)
      const update_time = new Date().getTime()
      User.set({
        user_password: `${str}`,
        updated_at: `${update_time}`
      })

      User.save(`user_id="${userid}"`)
      .then(response => {
        if (response.vals.affectedRows > 0) {
          resolve()
        } else {
          reject()
        }
      })
      .catch(response => {
        reject()
      })
    })
  },
  getUserByIdAndPwd (password, userid) {
    return new Promise((resolve, reject) => {
      const str = util.encodeMd5(`${password}`)
      User.find('all', {where: `user_id="${userid}" and user_password="${str}"`})
      .then(res => {
        const {vals} = res
        resolve(vals)
      })
      .catch(res => {
        reject()
      })
    })
  },
  saveUser (username, password) {
    return new Promise((resolve, reject) => {
      const str = util.encodeMd5(password)
      const create_time = new Date().getTime()
      const userId = util.encodeMd5(`${create_time}`)
      User.set({
        user_id: `${userId}`,
        user_username: `${username}`,
        user_password: `${str}`,
        created_at: `${create_time}`
      })
      User.save()
      .then(res => {
        const {vals} = res
        if (vals.affectedRows === 1) {
          resolve(userId)
        } else {
          reject()
        }
      }).catch(res => {
        reject()
      }) 
    })
  }
}