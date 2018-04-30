import Config from '../config'

export const actionTypes = {
  REGISTER_SUBMIT: 'REGISTER_SUBMIT',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  FETCH_USER_PETITIONS_REQUEST: 'FETCH_USER_PETITIONS_REQUEST',
  FETCH_USER_PETITIONS_SUCCESS: 'FETCH_USER_PETITIONS_SUCCESS',
  FETCH_USER_PETITIONS_FAILURE: 'FETCH_USER_PETITIONS_FAILURE'
}

export function register(fields) {
  return dispatch => {
    dispatch({
      type: actionTypes.REGISTER_SUBMIT
    })
    return fetch(`${Config.API_URI}/users/register.json`, {
      method: 'POST',
      body: JSON.stringify(fields)
    })
      .then(response =>
        response.json().then(() => {
          // if (false) {
          //   // login user if valid and route user to https://petitions.moveon.org/no_petition.html
          //   // otherwise disatch failure with errors
          //   dispatch({
          //     type: actionTypes.REGISTER_SUCCESS,
          //     nice: 'nice'
          //   })
          // } else {
          dispatch({
            type: actionTypes.REGISTER_FAILURE,
            formErrors: [{ message: 'failed to register user' }]
          })
          // }
        })
      )
      .catch(() => {
        dispatch({
          type: actionTypes.REGISTER_FAILURE,
          formErrors: [{ message: 'server error: account was not created' }]
        })
      })
  }
}

export function loadUserPetitions() {
  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_USER_PETITIONS_REQUEST
    })
    return fetch(`${Config.API_URI}/user/petitions.json`)
      .then(response => response.json())
      .then(
        json => {
          dispatch({
            type: actionTypes.FETCH_USER_PETITIONS_SUCCESS,
            petitions: json._embedded
          })
        },
        err => {
          dispatch({
            type: actionTypes.FETCH_USER_PETITIONS_FAILURE,
            error: err
          })
        }
      )
  }
}

export function forgotPassword(email) {
  // We don't care much about the response in this case
  return fetch(`${Config.API_URI}/users/forgot-password.json`, {
    method: 'POST',
    body: JSON.stringify({ email })
  })
    .then(() => true)
    .catch(() => true)
}

export const actions = {
  register,
  loadUserPetitions,
  forgotPassword
}
