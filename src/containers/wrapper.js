import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { loadSession } from '../actions/sessionActions'

import WrapperComponent from 'Theme/wrapper'

class Wrapper extends React.Component {
  componentDidMount() {
    this.props.dispatch(loadSession(this.props.location))
  }

  render() {
    const { petitionEntity, location, children, routes } = this.props
    let entity = petitionEntity
    if (location.pathname.indexOf('/pac/') !== -1) {
      entity = 'pac'
    }

    return (
      <WrapperComponent
        entity={entity}
        minimalNav={!!routes[routes.length - 1].minimalNav}
      >
        {children}
      </WrapperComponent>
    )
  }
}

Wrapper.propTypes = {
  petitionEntity: PropTypes.string,
  location: PropTypes.object,
  children: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(store, ownProps) {
  // Fetch the petition only if the route has a `petition_slug` param
  const petitionSlug = ownProps.params && ownProps.params.petition_slug
  const petition = petitionSlug && store.petitionStore.petitions[petitionSlug.split('.')[0]]

  return {
    petitionEntity: petition && petition.entity
  }
}

export default connect(mapStateToProps)(Wrapper)
