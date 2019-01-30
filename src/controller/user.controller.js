import UserService from '../service/user.service'
import CompanyService from '../service/company.service'
import {mapService} from '../utils/index'
import regeneratorRuntime from '../lib/runtime'

export default class UserController{
  constructor(app) {
    app.post('/user/add', this.addUser.bind(this))
    app.post('/user/register', this.registerUser.bind(this))
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
      const userInfo = vals.map(mapService.mapUser)[0]
      CompanyService.getCompanyByUserid(userInfo.userId).then(response => {
        const companyInfo = response.map(mapService.mapUserCompany)[0]
        const newData = {...userInfo, ...companyInfo}
        data = {
          code: 200,
          data: newData,
          message: '登录成功'
        }
        res.json(data)
      }).catch(() => {
        res.json(data)
      })
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

  async registerUser (req, res) {
    const {username, password, companyname, code} = req.body
    let data = {
      code: 300,
      message: '新增失败'
    }
    try {
      if (req.session.captcha !== code) {
        data.message = '验证码不正确'
        res.json(data)
        return
      }
      const companyList = await CompanyService.getCompanyByName(companyname)
      if (companyList.length > 0) {
        data.message = '公司名已存在'
        res.json(data)
        return
      }
      const userList = await UserService.getUserByName(username)
      if (userList.length > 0) {
        data.message = '已存在该用户'
        res.json(data)
        return
      }
      const companyId = await CompanyService.saveCompany(companyname)
      const userId = await UserService.saveUser(username, password)
      await CompanyService.saveUserCompany(userId, companyId, 1)
      data = {
        code: 200,
        message: 'success'
      }
      res.json(data) 
    } catch (err) {
      res.json(data)
    }
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

      UserService.saveUser(username, password).then(() => {
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