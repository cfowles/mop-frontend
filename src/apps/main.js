import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from '../store/configureStore'
import { routes } from '../routes'

// See reducers/index.js for initialState (and all possible transient states
const store = configureStore()

function run() {
  ReactDOM.render(
    <Provider store={store}>{routes(store)}</Provider>,
    document.getElementById('root')
  )
}

if (
  document.body &&
  (document.readyState === 'complete' ||
    document.readyState === 'loaded' ||
    document.readyState === 'interactive')
) {
  run()
} else {
  window.addEventListener('DOMContentLoaded', run, false)
}
