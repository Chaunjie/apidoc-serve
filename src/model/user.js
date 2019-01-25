import { model } from 'nodejs-mysql-model'

export default new model({
  tableName: 'apidoc_user',
  attributes: {
    id: {
      type: String
    },
    user_username: {
      type: String
    },
    user_password: {
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
    user_state: {
      type: Number,
      default: 1
    },
    user_id: {
      type: String
    }
  }
})