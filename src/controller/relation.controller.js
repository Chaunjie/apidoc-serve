import RelationService from '../service/relation.service'
import { needLogin, needList } from '../service/verify.service'

export default class RelationController{
  constructor(app) {
    app.post('/relation/update', this.updateRelations.bind(this))
  }

  @needList
  @needLogin
  updateRelations (req, res) {
    const {list, userid} = req.body
    let data = {
      code: 300,
      message: 'error'
    }
    RelationService.deleteRelation(userid, list).then(() => {
      data = {
        code: 200,
        message: 'success'
      }
      res.json(data)
    }).catch(() => {
      res.json(data)
    })
  }
}