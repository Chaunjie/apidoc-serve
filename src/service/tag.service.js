import Tag from '../model/tag'
import Api from '../model/api'
import {util, mapService} from '../utils/index'

export default {
  queryList (projectid) {
    return new Promise((resolve, reject) => {
      Tag.find('all', { where: `project_id="${projectid}"` })
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
  getMenuTag (list) {
    list = list.map(mapService.mapTag)
    const arr = list.map(r => {
      return `"${r.id}"`
    })
    return new Promise((resolve, reject) => {
      if (arr.length) {
        Api.find('all', { where: `sort_id in (${arr.join(', ')})` })
        .then(res => {
          const { vals } = res
          const apiArr = (vals || []).map(mapService.mapApi)
          const newArr = list.map(r => {
            return {
              ...r,
              apiList: apiArr.filter(d => {
                return d.tagId === r.id
              })
            }
          })
          resolve(newArr)
        })
        .catch(res => {
          reject()
        })
      } else {
        const newArr = list.map(r => {
          return {
            ...r,
            apiList: []
          }
        })
        resolve(newArr)
      }
    })
  },
  addTag (projectid, tagname) {
    return new Promise((resolve, reject) => {
      const create_time = new Date().getTime()
      const str = util.encodeMd5(`${create_time}`)
      Tag.set({
        sort_id: `${str}`,
        project_id: `${projectid}`,
        sort_name: `${tagname}`,
        created_at: `${create_time}`
      })
      Tag.save()
      .then(res => {
        if (res.vals.affectedRows === 1) {
          resolve()
        } else {
          reject()
        }
      })
      .catch(res => {
        reject()
      })
    })
  },
  updateTagById (tagid, tagname) {
    return new Promise((resolve, reject) => {
      const update_time = new Date().getTime()
      Tag.set({
        updated_at: `${update_time}`,
        sort_name: `${tagname}`
      })
      Tag.save(`sort_id="${tagid}"`)
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
  },
  deleteTagById (id) {
    return new Promise((resolve, reject) => {
      Tag.remove(`sort_id="${id}"`)
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