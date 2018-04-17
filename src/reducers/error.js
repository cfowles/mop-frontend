import { actionTypes as serverErrorActionTypes } from '../actions/serverErrorActions'
import { actionTypes as staticPageActionTypes } from '../actions/staticPageActions'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case staticPageActionTypes.FETCH_PAGE_FAILURE:
    case serverErrorActionTypes.SERVER_ERROR:
      return action.error
    default:
      return state
  }
}

export default reducer
