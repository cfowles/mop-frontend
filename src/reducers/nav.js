import { combineReducers } from 'redux'
import { actionTypes as navActionTypes } from '../actions/navActions'

const { FETCH_ORG_SUCCESS } = navActionTypes

/* nav state:
 * {
 *   orgs: { [slug]: org }
 * }
 */

function orgs(state = {}, action) {
  switch (action.type) {
    case FETCH_ORG_SUCCESS:
      return {
        ...state,
        [action.slug]: action.org
      }
    default:
      return state
  }
}

export default combineReducers({
  orgs
})
