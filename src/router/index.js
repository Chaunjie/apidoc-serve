import fs from 'fs'
import path from 'path'

export default class Router {
  constructor(props) {
    this.fsPath = path.resolve(__dirname, '../controller')
    this.rePath = '../controller'
  }

  initRouter(app){
    const {fsPath, rePath} = this
    fs.readdir(fsPath, function (err, list) {
      if (err) {
        console.log('没有找到该文件');
      }
      list.forEach((r) => {
        const singleServices = require(`${rePath}/${r}`)
        new singleServices.default(app)
      })
    })
  }
}