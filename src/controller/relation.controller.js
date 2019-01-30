import RelationService from '../service/relationService'

export default class RelationController{
  constructor(app) {
    app.post('/relation/update', this.updateRelations.bind(this))
  }

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