import { actionTypes as serverErrorActionTypes } from '../actions/serverErrorActions'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case serverErrorActionTypes.SERVER_ERROR:
      return action.error
    default:
      return state
  }
}

export default reducer
