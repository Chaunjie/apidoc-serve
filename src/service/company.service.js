import Company from '../model/company'
import UserCompany from '../model/user.company'
import {util} from '../utils/index'

export default {
  getCompanyByName (name) {
    return new Promise((resolve, reject) => {
      Company.find('all', { where: `company_name="${name}"` }).then(res => {
        const { vals } = res
        resolve(vals)
      }).catch(res => {
        reject()
      })
    })
  },
  getCompanyByUserid (userid) {
    return new Promise((resolve, reject) => {
      Company.query(`select * from apidoc_company as pc left join apidoc_user_company as upc on pc.company_id=upc.company_id where upc.user_id="${userid}"`)
      .then(res => {
        const { vals } = res
        if (vals.length) {
          resolve(vals)
        } else {
          resolve([])
        }
      })
      .catch(res => {
        reject()
      })
    })
  },
  saveCompany (name) {
    return new Promise((resolve, reject) => {
      const created_at = new Date().getTime()
      const str = util.encodeMd5(`${created_at}`)
      Company.set({
        company_id: `${str}`,
        company_name: `${name}`,
        created_at: `${created_at}`
      })
      Company.save().then(res => {
        const {vals} = res
        if (vals.affectedRows === 1) {
          resolve(str)
        } else {
          reject()
        }
      }).catch(() => {
        reject()
      })
    })
  },
  saveUserCompany (userId, companyId, state) {
    return new Promise((resolve, reject) => {
      const created_at = new Date().getTime()
      UserCompany.set({
        company_id: `${companyId}`,
        user_id: `${userId}`,
        created_at: `${created_at}`,
        user_role: state
      })
      UserCompany.save().then(res => {
        const {vals} = res
        if (vals.affectedRows === 1) {
          resolve()
        } else {
          reject()
        }
      }).catch(() => {
        reject()
      })
    })
  }
}