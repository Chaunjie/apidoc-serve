import User from '../model/user'
import {util, mapService} from '../utils/index'
import regeneratorRuntime from '../lib/runtime' 

export default class UserController{
  constructor(app) {
    app.post('/user/add', this.addUser.bind(this))
    app.post('/user/login', this.checkUser)
    app.post('/user/update', this.updateUser)
    app.get('/user/list', this.getList)
    app.delete('/user/delete', this.deleteUser)
  }

  getList (req, res) {
    const {userid} = req.query
    let data = {
      code: 300,
      message: '用户信息获取失败'
    }
    User.find('all')
    .then(response => {
      let {vals} = response
      vals = vals.filter(r => {
        return r.id !== 1
      })
      data = {
        code: 200,
        list: vals.map(mapService.mapUser),
        message: 'success'
      }
      res.json(data)
    }).catch(response => {
      res.json(data)
    })
  }

  deleteUser (req, res) {
    const {userid} = req.query
    let data = {
      code: 301,
      message: '删除失败'
    }
    User.remove(`user_id="${userid}"`)
    .then(response => {
      const {vals} = response
      if (vals.affectedRows === 1) {
        data = {
          code: 200,
          message: '删除成功'
        }
      }
      res.json(data)
    }).catch(response => {
      res.json(data)
    })
  }

  checkUser (req, res) {
    const {username, password} = req.body
    const str = util.encodeMd5(password)
    let data = {
      code: 301,
      message: '登录失败'
    }
    User.find('all', { where: `user_username="${username}" and user_password="${str}"` })
    .then(response => {
      const {vals} = response
      if (vals.length) {
        data = {
          code: 200,
          data: vals.map(mapService.mapUser)[0],
          message: '登录成功'
        }
      }
      res.json(data)
    }).catch(response => {
      res.json(data)
    })
  }

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
  }

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
  }

  updateUser (req, res) {
    const {password, userid} = req.body
    let data = {
      code: 300,
      message: 'error'
    }
    const str = util.encodeMd5(`${password}`)
    const update_time = new Date().getTime()
    User.set({
      user_password: `${str}`,
      updated_at: `${update_time}`
    })

    User.save(`user_id="${userid}"`)
    .then(response => {
      if (response.vals.affectedRows > 0) {
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

  async addUser (req, res) {
    try {
      const {username, password} = req.body
      const userList = await this.getUserByName(username)
      if (userList.length > 0) {
        const data = {
          code: 300,
          message: '已存在该用户'
        }
        res.json(data)
        return
      }
      const lastId = await this.getLastId()
      const id = +lastId[0]['max(id)'] + 1
      const userId = util.encodeMd5(id + '')
      const str = util.encodeMd5(password)
      const create_time = new Date().getTime()
      User.set({
        user_id: `${userId}`,
        user_username: `${username}`,
        user_password: `${str}`,
        created_at: `${create_time}`
      })
      User.save()
      .then(response => {
        const {vals} = response
        if (vals.affectedRows === 1) {
          const data = {
            code: 200,
            message: 'success'
          }
          res.json(data)
        } else {
          const data = {
            code: 300,
            message: '新增失败'
          }
          res.json(data)
        }
      }).catch(response => {
        const data = {
          code: 300,
          message: '新增失败'
        }
        res.json(data)
      }) 
    } catch (err) {
      console.log(err)
    }
  }
}