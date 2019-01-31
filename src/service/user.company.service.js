import UserCompany from '../model/user.company'

export default {
  saveUserCompany (userid, companyid) {
    return new Promise((resolve, reject) => {
      const created_at = new Date().getTime()
      UserCompany.set({
        user_id: `${userid}`,
        company_id: `${companyid}`,
        created_at: `${created_at}`
      })
      UserCompany.save()
      .then(response => {
        if (response.affectedRows === 1) {
          resolve(userId)
        } else {
          reject()
        }
      })
      .catch(response => {
        reject()
      })
    })
  },
  getInfoById (userid) {
    return new Promise((resolve, reject) => {
      UserCompany.find('all', { where: `user_id="${userid}"` })
      .then(res => {
        const {vals} = res
        if (vals.length) {
          resolve(vals[0])
        } else {
          resolve({})
        }
      })
      .catch(res => {
        reject()
      })
    })
  }
}