import Config from '../config.js'

export const actionTypes = {
  FETCH_ORG_REQUEST: 'FETCH_ORG_REQUEST',
  FETCH_ORG_SUCCESS: 'FETCH_ORG_SUCCESS',
  FETCH_ORG_FAILURE: 'FETCH_ORG_FAILURE'
}

export function loadOrganization(orgSlug, forceReload) {
  const urlKey = `organizations/${orgSlug}`
  if (global && global.preloadObjects && global.preloadObjects[urlKey]) {
    return (dispatch) => {
      dispatch({
        type: actionTypes.FETCH_ORG_SUCCESS,
        org: window.preloadObjects[urlKey],
        slug: orgSlug
      })
    }
  }
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.FETCH_ORG_REQUEST,
      slug: orgSlug
    })
    const { navStore } = getState()
    if (!forceReload
        && navStore
        && navStore.orgs
        && navStore.orgs[orgSlug]) {
      return dispatch({
        type: actionTypes.FETCH_ORG_SUCCESS,
        org: navStore.orgs[orgSlug],
        slug: orgSlug
      })
    }
    return fetch(`${Config.API_URI}/${urlKey}.json`)
      .then(
        (response) => response.json().then((json) => {
          dispatch({
            type: actionTypes.FETCH_ORG_SUCCESS,
            org: json,
            slug: json.name || orgSlug
          })
        }),
        (err) => {
          dispatch({
            type: actionTypes.FETCH_ORG_FAILURE,
            error: err,
            slug: orgSlug
          })
        }
      )
  }
}
