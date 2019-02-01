// 基础
// 只读属性
export const readonly = (target, name, descriptor) => {
  descriptor.writable = false;
  return descriptor
}


// 用户相关
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


// 公司相关
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

// 项目相关
export const needProject = (target, name, descriptor) => {
  const targetFun = descriptor.value
  descriptor.value = (req, res, next) => {
    if (!req.query.projectid && !req.body.projectid) {
      res.json({
        code: 301,
        message: '缺少项目信息'
      })
      return
    }
    targetFun.call(null, req, res, next)
    return targetFun
  }
  return descriptor
}

export const needProjectName = (target, name, descriptor) => {
  const targetFun = descriptor.value
  descriptor.value = (req, res, next) => {
    if (!req.query.projectname && !req.body.projectname) {
      res.json({
        code: 301,
        message: '缺少项目名称'
      })
      return
    }
    targetFun.call(null, req, res, next)
    return targetFun
  }
  return descriptor
}


// API相关
export const needApiId = (target, name, descriptor) => {
  const targetFun = descriptor.value
  descriptor.value = (req, res, next) => {
    if (!req.query.id && !req.body.id) {
      res.json({
        code: 301,
        message: '缺少apiid'
      })
      return
    }
    targetFun.call(null, req, res, next)
    return targetFun
  }
  return descriptor
}

export const needApiInfo = (target, name, descriptor) => {
  const targetFun = descriptor.value
  descriptor.value = (req, res, next) => {
    if (!req.query.apiname && !req.body.apiname) {
      res.json({
        code: 301,
        message: '缺少名称'
      })
      return
    }
    if (!req.query.mdcontent && !req.body.mdcontent) {
      res.json({
        code: 301,
        message: '缺少markdown文本'
      })
      return
    }
    if (!req.query.htmlcontent && !req.body.htmlcontent) {
      res.json({
        code: 301,
        message: '缺少html文本'
      })
      return
    }
    targetFun.call(null, req, res, next)
    return targetFun
  }
  return descriptor
}


// 标签相关
export const needTagId = (target, name, descriptor) => {
  const targetFun = descriptor.value
  descriptor.value = (req, res, next) => {
    if (!req.query.tagid && !req.body.tagid) {
      res.json({
        code: 301,
        message: '缺少标签相关信息'
      })
      return
    }
    targetFun.call(null, req, res, next)
    return targetFun
  }
  return descriptor
}

export const needTagName = (target, name, descriptor) => {
  const targetFun = descriptor.value
  descriptor.value = (req, res, next) => {
    if (!req.query.tagname && !req.body.tagname) {
      res.json({
        code: 301,
        message: '缺少标签名称'
      })
      return
    }
    targetFun.call(null, req, res, next)
    return targetFun
  }
  return descriptor
}

export const needTagById = (target, name, descriptor) => {
  const targetFun = descriptor.value
  descriptor.value = (req, res, next) => {
    if (!req.query.id && !req.body.id) {
      res.json({
        code: 301,
        message: '缺少标签相关信息'
      })
      return
    }
    targetFun.call(null, req, res, next)
    return targetFun
  }
  return descriptor
}

// 用户关联项目相关
export const needList = (target, name, descriptor) => {
  const targetFun = descriptor.value
  descriptor.value = (req, res, next) => {
    if (!req.query.list && !req.body.list) {
      res.json({
        code: 301,
        message: '缺少项目关联数组'
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