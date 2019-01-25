import { model } from 'nodejs-mysql-model'

export default new model({
  tableName: 'apidoc_user_project',
  attributes: {
    user_id: {
      type: String
    },
    project_id: {
      type: String
    }
  }
})