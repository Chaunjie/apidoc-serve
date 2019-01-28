import UserService from '../service/userService'
import {mapService} from '../utils/index'
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

    UserService.getList().then(vals => {
      data = {
        code: 200,
        list: vals.map(mapService.mapUser),
        message: 'success'
      }
      res.json(data)
    }).catch(res => {
      res.json(data)
    })
  }

  deleteUser (req, res) {
    const {userid} = req.query
    let data = {
      code: 301,
      message: '删除失败'
    }

    UserService.deleteUser(userid).then(response => {
      data = {
        code: 200,
        message: '删除成功'
      }
      res.json(data)
    }).catch(response => {
      res.json(data)
    })
  }

  checkUser (req, res) {
    const {username, password} = req.body
    let data = {
      code: 301,
      message: '登录失败'
    }

    UserService.checkUserByNamePwd(username, password).then(vals => {
      data = {
        code: 200,
        data: vals.map(mapService.mapUser)[0],
        message: '登录成功'
      }
      res.json(data)
    }).catch(response => {
      res.json(data)
    })
  }

  updateUser (req, res) {
    const {password, userid} = req.body
    let data = {
      code: 300,
      message: 'error'
    }

    UserService.updateById(password, userid).then(vals => {
      data = {
        code: 200,
        message: 'success'
      }
      res.json(data)
    }).catch(response => {
      res.json(data)
    })
  }

  async addUser (req, res) {
    const {username, password} = req.body
    let data = {
      code: 300,
      message: '新增失败'
    }
    try {
      const userList = await UserService.getUserByName(username)
      if (userList.length > 0) {
        data.message = '已存在该用户'
        res.json(data)
        return
      }
      const lastId = await UserService.getLastId()
      const id = +lastId[0]['max(id)'] + 1
      UserService.saveUser(id, username, password).then(() => {
        const data = {
          code: 200,
          message: 'success'
        }
        res.json(data)
      }).catch(data => {
        res.json(data)
      })
    } catch (err) {
      res.json(data)
    }
  }
}