import React from 'react'
import { Router, Route, browserHistory, hashHistory } from 'react-router'

import './polyfills'
import { Config } from '../config'
import { loadSession } from '../actions/sessionActions'
import Nav from '../containers/nav'


export const appLocation = (Config.USE_HASH_BROWSING ? hashHistory : browserHistory)

export const routes = store => (
  <Router history={appLocation}>
    <Route path='*' component={Nav} onEnter={(nextState) => { store.dispatch(loadSession(nextState)) }} />
  </Router>
)
