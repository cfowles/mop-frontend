import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './polyfills'
import configureStore from '../store/configureStore'
import { routes } from './nav-only-routes'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>{routes(store)}</Provider>,
  document.getElementById('header')
)
