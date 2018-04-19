import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { PetitionReportComponent } from 'LegacyTheme/petition-report'
import { loadPetition } from '../actions/petitionActions'

class PetitionReport extends React.Component {

  componentWillMount() {
    const { petition, location, dispatchLoadPetition } = this.props
    const petitionId = location.query.petition_id

    if (!petition) {
      if (petitionId) {
        dispatchLoadPetition(petitionId)
      }
    }
  }

  render() {
    const { petition } = this.props
    // TODO: load signatureStats from API when data is available in API
    const signatureStats = {
      ever: {
        all: [0, 0, 0, 0, 108269, 46540, 11962],
        facebook: [0, 0, 0, 0, 393, 466, 107],
        twitter: [0, 0, 0, 0, 281, 187, 30],
        email: [0, 0, 0, 0, 1588, 1336, 273]
      },
      hourly: {
        all: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 11, 9, 10, 9, 16, 16, 19, 21, 8, 10, 12, 14, 16, 14, 14, 10, 18, 13, 15, 14, 6, 15, 13, 16, 7, 5, 15, 18, 9, 14, 15, 13, 13, 8, 11, 7, 6, 10, 11, 15, 11, 11, 14, 9, 16, 15, 8, 15, 12, 11, 12, 16, 17, 12, 7, 15, 20, 13, 8],
        facebook: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        twitter: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1],
        email: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
      },
      daily: {
        all: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 729, 21],
        facebook: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        twitter: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
        email: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7]
      },
      growth: {
        all: [0, 0, 0, 0, 108269, 46540, 11962],
        facebook: [0, 0, 0, 0, 393, 466, 107],
        twitter: [0, 0, 0, 0, 281, 187, 30],
        email: [0, 0, 0, 0, 1588, 1336, 273]
      }
    }
    if (petition) {
      return (
        <PetitionReportComponent petition={petition} signatureStats={signatureStats} />
      )
    }
    return null
  }
}

PetitionReport.propTypes = {
  petition: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  location: PropTypes.object,
  dispatchLoadPetition: PropTypes.func
}

const mapStateToProps = (store, ownProps) => {
  const { petitionStore: { petitions } } = store
  const petition = petitions[ownProps.location.query.petition_id]
  return {
    petition: (typeof petition === 'undefined') ? false : petition
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLoadPetition: (petitionId) => dispatch(loadPetition(petitionId))
})

export default connect(mapStateToProps, mapDispatchToProps)(PetitionReport)
