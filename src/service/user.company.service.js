import UserCompany from '../model/user.company'

export default {
  saveUserCompany (userid, companyid) {
    return new Promise((resolve, reject) => {
      const update_time = new Date().getTime()
      UserCompany.set({
        user_id: `${userid}`,
        company_id: `${companyid}`,
        updated_at: `${update_time}`
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
  updateById (userid, companyid) {
    return new Promise((resolve, reject) => {
      const update_time = new Date().getTime()
      UserCompany.set({
        user_id: `${userid}`,
        company_id: `${companyid}`,
        updated_at: `${update_time}`
      })
      UserCompany.save(`user_id="${userid}"`)
      .then(response => {
        if (response.vals.affectedRows > 0) {
          resolve()
        } else {
          reject()
        }
      })
      .catch(response => {
        reject()
      })
    })
  }
}