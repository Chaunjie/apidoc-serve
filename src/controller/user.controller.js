import UserService from '../service/user.service'
import CompanyService from '../service/company.service'
import UserCompanyService from '../service/user.company.service'
import {mapService} from '../utils/index'
import regeneratorRuntime from '../lib/runtime'

export default class UserController{
  constructor(app) {
    app.post('/user/add', this.addUser.bind(this))
    app.post('/user/register', this.registerUser.bind(this))
    app.post('/user/updatepwd', this.updatePwd.bind(this))
    app.post('/user/login', this.checkUser)
    app.post('/user/update', this.updateUser)
    app.get('/user/list', this.getList)
    app.delete('/user/delete', this.deleteUser)
  }

  async updatePwd (req, res) {
    const {oldpassword, newpassword, userid} = req.body
    let data = {
      code: 300,
      message: 'error'
    }
    try {
      const userList = await UserService.getUserByIdAndPwd(oldpassword, userid)
      if (userList.length === 0) {
        data.message = '不存在该用户, 或者原始密码不对'
        res.json(data)
        return
      }
      await UserService.updateById(newpassword, userid)
      data = {
        code: 200,
        message: 'success'
      }
      res.json(data)
    } catch (err) {
      res.json(data)
    }
  }

  async getList (req, res) {
    const {userid, companyid} = req.query
    let data = {
      code: 300,
      message: '用户信息获取失败'
    }
    try {
      const userCompanyInfo = await UserCompanyService.getInfoById(userid)
      if (userCompanyInfo.user_role !== 1) {
        data.message = '当前用户无法获取用户列表'
        res.json(data)
        return
      }
      UserService.getCompanyUserById(companyid).then(vals => {
        const newVals = vals.filter(r => {
          return r.user_id !== userid && r.user_role === 0
        })
        data = {
          code: 200,
          list: newVals.map(mapService.mapUser),
          message: 'success'
        }
        res.json(data)
      }).catch(res => {
        res.json(data)
      })
    } catch (err) {
      res.json(data)
    }
  }

  async deleteUser (req, res) {
    const {userid, adminid} = req.query
    let data = {
      code: 301,
      message: '删除失败'
    }

    try {
      const userCompanyInfo = await UserCompanyService.getInfoById(adminid)
      if (userCompanyInfo.user_role !== 1) {
        data.message = '当前用户无法删除用户'
        res.json(data)
        return
      }

      await UserService.deleteUser(userid)
       data = {
        code: 200,
        message: '删除成功'
      }
      res.json(data)
    } catch (err) {
      res.json(data)
    }
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
    const {username, password, companyid, userid} = req.body
    let data = {
      code: 300,
      message: '新增失败'
    }
    try {
      const userCompanyInfo = await UserCompanyService.getInfoById(userid)
      if (userCompanyInfo.user_role !== 1) {
        data.message = '当前用户无法新增用户'
        res.json(data)
        return
      }
      const userList = await UserService.getUserByName(username)
      if (userList.length > 0) {
        data.message = '已存在该用户'
        res.json(data)
        return
      }

      const userId = await UserService.saveUser(username, password)
      await CompanyService.saveUserCompany(userId, companyid, 0)
      data = {
        code: 200,
        message: 'success'
      }
      res.json(data)
    } catch (err) {
      res.json(data)
    }
  }
}