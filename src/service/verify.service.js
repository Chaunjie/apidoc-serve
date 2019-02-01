export const readonly = (target, name, descriptor) => {
  descriptor.writable = false;
  return descriptor
}
export const getProjectList  = (target, name, descriptor) => {
  const targetFun = descriptor.value
  descriptor.value = (req, res, next) => {
    console.log(req.query.userid)
    targetFun.call(null, req, res, next)
    return targetFun
  }
  return descriptor
}

export const needLogin = (target, name, descriptor) => {
  const targetFun = descriptor.value
  descriptor.value = (req, res, next) => {
    if (!req.query.userid && !req.body.userid) {
      res.json({
        code: 301,
        message: '缺少用户信息'
      })
      return
    }
    targetFun.call(null, req, res, next)
    return targetFun
  }
  return descriptor
}

export const needUsernameAndPwd = (target, name, descriptor) => {
  const targetFun = descriptor.value
  descriptor.value = (req, res, next) => {
    if (!req.query.username && !req.body.username) {
      res.json({
        code: 301,
        message: '缺少用户名'
      })
      return
    }
    if (!req.query.password && !req.body.password) {
      res.json({
        code: 301,
        message: '缺少密码'
      })
      return
    }
    targetFun.call(null, req, res, next)
    return targetFun
  }
  return descriptor
}

export const needCompany = (target, name, descriptor) => {
  const targetFun = descriptor.value
  descriptor.value = (req, res, next) => {
    if (!req.query.companyid && !req.body.companyid) {
      res.json({
        code: 301,
        message: '缺少公司信息'
      })
      return
    }
    targetFun.call(null, req, res, next)
    return targetFun
  }
  return descriptor
}

export const needAdminId = (target, name, descriptor) => {
  const targetFun = descriptor.value
  descriptor.value = (req, res, next) => {
    if (!req.query.adminid && !req.body.adminid) {
      res.json({
        code: 301,
        message: '添加人信息'
      })
      return
    }
    targetFun.call(null, req, res, next)
    return targetFun
  }
  return descriptor
}

export const needCompanyNameAndCode = (target, name, descriptor) => {
  const targetFun = descriptor.value
  descriptor.value = (req, res, next) => {
    if (!req.query.companyname && !req.body.companyname) {
      res.json({
        code: 301,
        message: '缺少公司信息'
      })
      return
    }
    if (!req.query.code && !req.body.code) {
      res.json({
        code: 301,
        message: '缺少验证码'
      })
      return
    }
    targetFun.call(null, req, res, next)
    return targetFun
  }
  return descriptor
}

export const needAllPwd = (target, name, descriptor) => {
  const targetFun = descriptor.value
  descriptor.value = (req, res, next) => {
    if (!req.query.oldpassword && !req.body.oldpassword) {
      res.json({
        code: 301,
        message: '缺少旧密码信息'
      })
      return
    }
    if (!req.query.newpassword && !req.body.newpassword) {
      res.json({
        code: 301,
        message: '缺少新密码信息'
      })
      return
    }
    targetFun.call(null, req, res, next)
    return targetFun
  }
  return descriptor
}

// export const needLogin = (options) => {
//   return (target, name, descriptor) => {
//     const targetFun = descriptor.value
//     descriptor.value = (req, res, next) => {
//       console.log(req.query.userid)
//       if ((options.query && !req.query.userid) || (options.body && !req.body.userid)) {
//         res.json({
//           code: 301,
//           message: '缺少用户信息'
//         })
//         return
//       }
//       targetFun.call(null, req, res, next)
//       return targetFun
//     }
//     return descriptor
//   }
// }