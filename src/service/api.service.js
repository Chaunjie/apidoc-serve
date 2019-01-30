import Api from '../model/api'
import {util} from '../utils/index'

export default {
  getApiById (id) {
    return new Promise((resolve, reject) => {
      Api.find('all', { where: `api_id="${id}"` })
      .then(res => {
        const { vals } = res
        resolve(vals)
      })
      .catch(res => {
        reject()
      })
    })
  },
  addApi (create_time, apiname, tagid, projectid, mdcontent, htmlcontent) {
    const str = util.encodeMd5(`${create_time}`)
    return new Promise((resolve, reject) => {
      Api.set({
        api_id: str,
        sort_id: tagid,
        project_id: projectid,
        api_name: apiname,
        api_edit_content: mdcontent,
        api_show_content: htmlcontent,
        created_at: `${create_time}`
      })
      Api.save()
      .then(res => {
        if (res.vals.affectedRows === 1) {
          resolve(str)
        } else {
          reject()
        }
      })
      .catch(response => {
        reject()
      })
    })
  },
  updateApiById (tagid, apiname, mdcontent, htmlcontent, id) {
    return new Promise((resolve, reject) => {
      const update_time = new Date().getTime()
      Api.set({
        sort_id: tagid,
        api_name: apiname,
        api_edit_content: mdcontent,
        api_show_content: htmlcontent,
        updated_at: `${update_time}`
      })
      Api.save(`api_id="${id}"`)
      .then(res => {
        if (res.vals.affectedRows === 1) {
          resolve()
        } else {
          reject()
        }
      })
      .catch(data => {
        reject()
      })
    })
  },
  removeApiById (id) {
    return new Promise((resolve, reject) => {
      Api.remove(`api_id="${id}"`)
      .then(res => {
        if (res.vals.affectedRows === 1) {
          resolve()
        } else {
          reject()
        }
      })
      .catch(() => {
        reject()
      })
    })
  }
}