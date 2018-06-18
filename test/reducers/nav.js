import { expect } from 'chai'
import reducer from '../../src/reducers/nav'

import { actionTypes as navActionTypes } from '../../src/actions/navActions'

const { FETCH_ORG_SUCCESS } = navActionTypes

const defaultState = reducer(undefined, {})

describe('nav reducer', () => {
  it('default state', () => {
    expect(defaultState).to.deep.equal({
      orgs: {}
    })
  })

  it('adds orgs to table when FETCH_ORG_SUCCESS', () => {
    const type = FETCH_ORG_SUCCESS
    const action = {
      type,
      slug: 'test',
      org: { test: true }
    }

    let state = reducer(defaultState, action)
    expect(state.orgs.test, 'orgs.test saved')
      .to.equal(action.org)

    state = reducer(state, { type, slug: 'test2', org: 'test2' })
    expect(state.orgs.test2, 'orgs.test2 saved')
      .to.equal('test2')
    expect(state.orgs.test, 'orgs.test unchanged')
      .to.equal(action.org)

    state = reducer(state, { type, slug: 'test', org: 'test' })
    expect(state.orgs.test, 'orgs.test overwritten')
      .to.equal('test')
    expect(state.orgs.test2, 'orgs.test2 unchanged')
      .to.equal('test2')
  })
})
