import { expect } from 'chai'
import reducer from '../../src/reducers'

import { actionTypes as accountActionTypes } from '../../src/actions/accountActions'
import sampleUserPetions from '../../local/api/v1/user/petitions.json'

const defaultState = reducer(undefined, {})

describe('user petition reducer', () => {
  it('adds petitions to state when FETCH_USER_PETITIONS_SUCCESS', () => {
    const action = {
      type: accountActionTypes.FETCH_USER_PETITIONS_SUCCESS,
      petitions: sampleUserPetions._embedded
    }

    const state = reducer(defaultState, action)
    expect(state.userStore.petitions).to.deep.equal([95983])
  })
})
