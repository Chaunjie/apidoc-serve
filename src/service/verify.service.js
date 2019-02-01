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