import Config from '../config'
import { parseAPIResponse, rejectNetworkErrorsAs500 } from '../lib'

export const actionTypes = {
  FETCH_PAGE_REQUEST: 'FETCH_PAGE_REQUEST',
  FETCH_PAGE_SUCCESS: 'FETCH_PAGE_SUCCESS',
  FETCH_PAGE_FAILURE: 'FETCH_PAGE_FAILURE'
}

export function loadStaticPage(wordpressId) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.FETCH_PAGE_REQUEST,
      wordpressId
    })
    const { staticPageStore } = getState()
    if (staticPageStore && staticPageStore[wordpressId]) {
      return dispatch({
        type: actionTypes.FETCH_PAGE_SUCCESS,
        page: staticPageStore[wordpressId]
      })
    }
    return fetch(`${Config.WORDPRESS_API_URI}/wp/v2/pages/${wordpressId}`)
      .catch(rejectNetworkErrorsAs500)
      .then(parseAPIResponse)
      .then(page => {
        dispatch({
          type: actionTypes.FETCH_PAGE_SUCCESS,
          page
        })
      })
      .catch(error => {
        dispatch({
          type: actionTypes.FETCH_PAGE_FAILURE,
          error,
          wordpressId
        })
      })
  }
}
