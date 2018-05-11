import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { actions as sessionActions } from '../actions/sessionActions'

class Logout extends React.Component {
  componentDidMount() {
    const { location, dispatch } = this.props
    dispatch(sessionActions.unRecognize({ redirect: location.query.redirect || '/' }))
  }

  render() {
    // sessionActions.unRecognize will redirect
    return null
  }
}

Logout.propTypes = {
  dispatch: PropTypes.func,
  location: PropTypes.object
}

export default connect()(Logout)
