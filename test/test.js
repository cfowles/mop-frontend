import React from 'react';
import { expect } from 'chai';

import { mount, shallow } from 'enzyme';
import Nav from '../src/components/nav.js';

import Config from '../src/config.js';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {actionTypes, loadPetition} from '../src/actions/petitionActions.js'
import nock from 'nock'
import samplePetition from '../local/api/v1/petitions/outkast.json';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const BASE_URI = 'http://localhost:8080';
Config.API_URI = BASE_URI

const expect_async = function(promise, done, f) {
  // Required structure for any async tests!!!
  // See http://stackoverflow.com/questions/11235815/
  promise.then(function() {
    try {
      f(arguments);
      done();
    } catch(e) {
      done(e);
    }
  });
}

describe('<Nav />', function() {
  it('contains logo', () => {
    const nav = shallow(<Nav />);
    expect(
      nav.find('.navbar-brand')
    ).to.have.length(1);
  });
  it('contains logo linking to petitions.moveon.org', () => {
    const nav = shallow(<Nav />);
    expect(
      nav.find('.navbar-brand').props().href
    ).to.include('petitions.moveon.org');
  });
  it('contains logo linking to petitions.moveon.org over HTTPS', () => {
    const nav = shallow(<Nav />);
    expect(
      nav.find('.navbar-brand').prop('href')
    ).to.equal('https://petitions.moveon.org/');
  });
  it('contains no insecure links to petitions.moveon.org', () => {
    const nav = shallow(<Nav />);
    expect(
      nav.find('a').someWhere(
        link => {
          return link.prop('href').startsWith('http://petitions.moveon.org')
        }
      )
    ).to.equal(false);
  });
});

describe('Petition loading', function() {
  nock(BASE_URI)
    .get('/api/v1/petitions/outkast.json')
    .reply(200, samplePetition)

  it('creates FETCH_PETITION_SUCCESS when loading petition', (done) => {
    const expectedActions = [
      { type: actionTypes.FETCH_PETITION_REQUEST, slug: 'outkast' },
      { type: actionTypes.FETCH_PETITION_SUCCESS,
        slug: 'outkast',
        petition: samplePetition }
    ]
    const store = mockStore()
    expect_async(store.dispatch(loadPetition('outkast')),
                 done,
                 () => {
                   const actions = store.getActions();
                   expect(actions).to.deep.equal(expectedActions);
                 });
  })
});
