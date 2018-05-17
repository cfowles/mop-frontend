import { actionTypes as serverErrorActionTypes } from '../actions/serverErrorActions'
import { actionTypes as staticPageActionTypes } from '../actions/staticPageActions'
import { actionTypes as petitionActionTypes } from '../actions/petitionActions'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case staticPageActionTypes.FETCH_PAGE_FAILURE:
    case petitionActionTypes.FETCH_PETITION_FAILURE:
    case petitionActionTypes.PETITION_SIGNATURE_FAILURE:
    case serverErrorActionTypes.SERVER_ERROR:
      return action.error
    case serverErrorActionTypes.CLEAR_ERROR:
      return {}
    default:
      return state
  }
}

export default reducer
