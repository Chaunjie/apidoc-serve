import { model } from 'nodejs-mysql-model'

export default new model({
  tableName: 'apidoc_project',
  attributes: {
    project_id: {
      type: String
    },
    project_name: {
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
    project_state: {
      type: Number,
      default: 1
    }
  }
})