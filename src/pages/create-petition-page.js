import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class CreatePetitionPage extends React.Component {

  render() {
    return (
      <div>
        <h2> Create a Petition </h2>
      </div>
    )
  }
}

function mapStateToProps(store, ownProps) {
  return {}
}

export default connect(mapStateToProps)(CreatePetitionPage)
