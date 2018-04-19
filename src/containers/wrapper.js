import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { loadSession } from '../actions/sessionActions'
import { checkServerError } from '../actions/serverErrorActions'

import { appLocation } from '../routes'

import { Error404 } from 'Theme/error404'
import { Error500 } from 'Theme/error500'
import WrapperComponent from 'Theme/wrapper'

function hasRouteBool(name, routes) {
  return !!routes[routes.length - 1][name]
}

class Wrapper extends React.Component {
  componentDidMount() {
    this.props.dispatch(checkServerError())
    this.props.dispatch(loadSession(this.props.location))
  }

  componentDidUpdate() {
    if (hasRouteBool('authenticated', this.props.routes)) {
      this.checkAuthenticationAndRedirect()
    }
  }

  checkAuthenticationAndRedirect() {
    const { user, location } = this.props

    if (user.anonymous || user.authenticated === false) {
      appLocation.push({
        pathname: '/login/index.html',
        query: {
          redirect: location.pathname + (location.search || '')
        }
      })
    }
  }

  render() {
    const { petitionEntity, location, children, routes, error } = this.props
    let entity = petitionEntity
    if (location.pathname.indexOf('/pac/') !== -1) {
      entity = 'pac'
    }

    return (
      <WrapperComponent
        entity={entity}
        minimalNav={hasRouteBool('minimalNav', routes)}
      >
        {error.response_code === 404 && <Error404 error={error} />}
        {error.response_code === 500 && <Error500 error={error} />}
        {!error.response_code && children}
      </WrapperComponent>
    )
  }
}

Wrapper.propTypes = {
  petitionEntity: PropTypes.string,
  location: PropTypes.object,
  children: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
  error: PropTypes.object
}

function mapStateToProps(store, ownProps) {
  // Fetch the petition only if the route has a `petition_slug` param
  const petitionSlug = ownProps.params && ownProps.params.petition_slug
  const petition = petitionSlug && store.petitionStore.petitions[petitionSlug.split('.')[0]]

  return {
    petitionEntity: petition && petition.entity,
    user: store.userStore,
    error: store.errorStore
  }
}

export default connect(mapStateToProps)(Wrapper)
