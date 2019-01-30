import { model } from 'nodejs-mysql-model'

export default new model({
  tableName: 'apidoc_project_company',
  attributes: {
    project_id: {
      type: String
    },
    company_id: {
      type: String
    },
    created_at: {
      type: String,
      default: '0'
    },
    updated_at: {
      type: String,
      default: '0'
    }
  }
})