import { model } from 'nodejs-mysql-model'

export default new model({
  tableName: 'apidoc_company',
  attributes: {
    company_id: {
      type: String
    },
    company_name: {
      type: String
    },
    created_at: {
      type: String,
      default: '0'
    },
    updated_at: {
      type: String,
      default: '0'
    },
    state: {
      type: Number,
      default: 1
    }
  }
})