import { model } from 'nodejs-mysql-model'

export default new model({
  tableName: 'apidoc_company',
  attributes: {
    user_id: {
      type: String
    },
    company_id: {
      type: String
    },
    user_role: {
      type: Number,
      default: 0
    }
  }
})