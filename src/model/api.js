import { model } from 'nodejs-mysql-model'

export default new model({
  tableName: 'apidoc_api',
  attributes: {
    api_id: {
      type: String
    },
    sort_id: {
      type: String
    },
    project_id: {
      type: String
    },
    api_name: {
      type: String
    },
    api_edit_content: {
      type: String
    },
    api_show_content: {
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
    api_state: {
      type: Number,
      default: 1
    }
  }
})