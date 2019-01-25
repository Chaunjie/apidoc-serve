import { model } from 'nodejs-mysql-model'

export default new model({
  tableName: 'apidoc_sort',
  attributes: {
    sort_id: {
      type: String
    },
    sort_top_id: {
      type: String,
      default: 0
    },
    sort_pid: {
      type: String,
      default: 0
    },
    project_id: {
      type: String
    },
    sort_name: {
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
    status: {
      type: Number,
      default: 1
    },
    sort_seq: {
      type: Number,
      default: 0
    }
  }
})