import { actionTypes } from '../actions/createPetitionActions'
import { getStateFullName } from '../lib'

// These will be added to the store as soon as the state is selected
// so the user doesn't have to wait for the target request to complete
// to see some default values.
const addStateInitialValues = geoState => [
  {
    label: `The entire ${getStateFullName(geoState)} Senate`,
    target_type: 'statesenate',
    target_id: geoState
  },
  {
    label: `The entire ${getStateFullName(geoState)} House`,
    target_type: 'statehouse',
    target_id: geoState
  },
  {
    label: `Govenor of ${getStateFullName(geoState)}`,
    target_type: 'governor',
    target_id: geoState
  }
]

const reducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TARGETS_REQUEST:
      if (action.group === 'national') return { ...state, national: [] }
      else if (action.group === 'state') {
        return {
          ...state,
          [`state--${action.geoState}`]: addStateInitialValues(action.geoState)
        }
      }
      return state

    case actionTypes.FETCH_TARGETS_SUCCESS:
      return {
        ...state,
        [action.storeKey]: [...state[action.storeKey] || [], ...action.targets]
      }
    default:
      return state
  }
}

export default reducer
