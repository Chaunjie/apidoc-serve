import moment from 'moment'

function baseProjectInfo (r) {
  return {
    projectId: r.project_id,
    projectName: r.project_name,
    projectState: r.project_state,
    createdAt: r.created_at,
    updatedAt: r.updated_at
  }
}

export default {
  mapUser (r) {
    return {
      userName: r.user_username,
      userId: r.user_id,
      createdTime: r.created_at,
      updatedTime: r.updated_at,
      date: moment(+r.created_at).format('YYYY-MM-DD')
    }
  },
  mapProject (r) {
    return {
      ...baseProjectInfo(r)
    }
  },
  mapUserProject (r) {
    return {
      ...baseProjectInfo(r),
      checked: r.checkEd
    }
  },
  mapTag (r) {
    return {
      id: r.sort_id,
      name: r.sort_name,
      createdAt: r.created_at,
      date: moment(+r.created_at).format('YYYY-MM-DD'),
      status: r.status,
      updatedAt: r.updated_at
    }
  },
  mapApi (r) {
    return {
      id: r.api_id,
      tagId: r.sort_id,
      name: r.api_name,
      editContent: r.api_edit_content,
      showContent: r.api_show_content
    }
  }
}