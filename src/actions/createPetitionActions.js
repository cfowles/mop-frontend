import 'whatwg-fetch'
import Config from '../config'
import { appLocation } from '../routes'
import { rejectNetworkErrorsAs500, parseAPIResponse } from '../lib'

export const actionTypes = {
  CREATE_PETITION_PREVIEW_SUBMIT: 'CREATE_PETITION_PREVIEW_SUBMIT',
  CREATE_PETITION_REQUEST: 'CREATE_PETITION_REQUEST',
  CREATE_PETITION_SUCCESS: 'CREATE_PETITION_SUCCESS',
  CREATE_PETITION_FAILURE: 'CREATE_PETITION_FAILURE',
  FETCH_TARGETS_REQUEST: 'FETCH_TARGETS_REQUEST',
  FETCH_TARGETS_SUCCESS: 'FETCH_TARGETS_SUCCESS',
  FETCH_TARGETS_FAILURE: 'FETCH_TARGETS_FAILURE'
}

export function previewSubmit({ title, summary, description, target }) {
  return {
    type: actionTypes.CREATE_PETITION_PREVIEW_SUBMIT,
    title,
    summary,
    description,
    target
  }
}

export function submit() {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.CREATE_PETITION_REQUEST
    })
    const { petitionCreateStore: p } = getState()
    return (
      fetch(`${Config.API_URI}/user/petitions.json`, {
        method: 'POST',
        body: JSON.stringify({
          petition: {
            title: p.title,
            summary: p.summary,
            description: p.description,
            targets: p.target
          }
        })
      })
        .catch(rejectNetworkErrorsAs500)
        .then(parseAPIResponse)
        .then(res => {
          dispatch({
            type: actionTypes.CREATE_PETITION_SUCCESS,
            petition: res
          })
          appLocation.push('/create_finished.html')
        })
        .catch(err => {
          // For now, treat every error as a 500 to just show the error page
          dispatch({
            type: actionTypes.CREATE_PETITION_FAILURE,
            error: { ...err, response_code: 500 }
          })
        })
    )
  }
}

export function loadTargets(group, geoState) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.FETCH_TARGETS_REQUEST,
      group,
      geoState
    })
    const { petitionTargetStore } = getState()

    let url = `${Config.API_URI}/targets.json?group=${group}`
    let storeKey = group

    if (group === 'state') {
      url += `&state=${geoState}`
      storeKey += `--${geoState}`
    } else if (group === 'national') {
      url += '&fed=1'
    }
    if (petitionTargetStore && petitionTargetStore[storeKey]) {
      return dispatch({
        type: actionTypes.FETCH_TARGETS_SUCCESS,
        targets: petitionTargetStore[storeKey],
        group,
        geoState,
        storeKey
      })
    }

    return fetch(url).then(
      response =>
        response.json().then(json => {
          dispatch({
            type: actionTypes.FETCH_TARGETS_SUCCESS,
            targets: json,
            group,
            geoState,
            storeKey
          })
        }),
      err => {
        dispatch({
          type: actionTypes.FETCH_TARGETS_FAILURE,
          error: err,
          group,
          geoState
        })
      }
    )
  }
}
