import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { loadSession } from '../actions/sessionActions'
import { checkServerError } from '../actions/serverErrorActions'

import { Error404 } from 'Theme/error404'
import { Error500 } from 'Theme/error500'
import WrapperComponent from 'Theme/wrapper'

class Wrapper extends React.Component {
  componentDidMount() {
    this.props.dispatch(checkServerError())
    this.props.dispatch(loadSession(this.props.location))
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
        minimalNav={!!routes[routes.length - 1].minimalNav}
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
  error: PropTypes.object
}

function mapStateToProps(store, ownProps) {
  // Fetch the petition only if the route has a `petition_slug` param
  const petitionSlug = ownProps.params && ownProps.params.petition_slug
  const petition = petitionSlug && store.petitionStore.petitions[petitionSlug]

  return {
    petitionEntity: petition && petition.entity,
    error: store.errorStore
  }
}

export default connect(mapStateToProps)(Wrapper)
