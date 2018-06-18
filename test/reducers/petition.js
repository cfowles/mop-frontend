import { expect } from 'chai'
import reducer from '../../src/reducers'

import { actionTypes as accountActionTypes } from '../../src/actions/accountActions'
import sampleUserPetions from '../../local/api/v1/user/petitions.json'
import sampleTopPetitions from '../../local/api/v1/top-petitions.json'
import samplePetition from '../../local/api/v1/petitions/outkast.json'
import { actionTypes as petitionActionTypes } from '../../src/actions/petitionActions'

const defaultState = reducer(undefined, {})

describe('petition reducer', () => {
  it('adds users petitions to state when FETCH_USER_PETITIONS_SUCCESS', () => {
    const action = {
      type: accountActionTypes.FETCH_USER_PETITIONS_SUCCESS,
      petitions: sampleUserPetions._embedded
    }

    const state = reducer(defaultState, action)
    expect(Object.keys(state.petitionStore.petitions)).to.deep.equal(['95983', 'outkast'])
  })

  it('adds top petitions to state when FETCH_TOP_PETITIONS_SUCCESS', () => {
    const action = {
      type: petitionActionTypes.FETCH_TOP_PETITIONS_SUCCESS,
      petitions: sampleTopPetitions._embedded,
      topPetitionsKey: 'test1'
    }

    const state = reducer(defaultState, action)

    expect(state.petitionStore.topPetitions)
      .to.have.property('test1')
      .to.deep.equal([95983])
    expect(Object.keys(state.petitionStore.petitions)).to.deep.equal(['95983', 'outkast'])
  })

  it('adds signature status to petitions state when PETITION_SIGNATURE_SUCCESS', () => {
    const action = {
      type: petitionActionTypes.PETITION_SIGNATURE_SUCCESS,
      petition: samplePetition,
      signatureStatus: samplePetition.petition_id
    }

    const state = reducer(defaultState, action)

    expect(state.petitionStore.signatureStatus)
      .to.have.property('95983')
      .to.deep.equal('success')
  })

  it('adds signature status with message to petitions state when PETITION_SIGNATURE_SUCCESS', () => {
    const action = {
      type: petitionActionTypes.PETITION_SIGNATURE_SUCCESS,
      signatureStatus: samplePetition.petition_id,
      petition: samplePetition,
      messageId: 'yo',
      messageMd5: 'yo yo yo yo yo'
    }

    const state = reducer(defaultState, action)

    expect(state.petitionStore.signatureMessages)
      .to.have.property('95983')
    expect(state.petitionStore.signatureMessages['95983'].messageId).to.deep.equal('yo')
    expect(state.petitionStore.signatureMessages['95983'].messageMd5).to.deep.equal('yo yo yo yo yo')
  })
})
