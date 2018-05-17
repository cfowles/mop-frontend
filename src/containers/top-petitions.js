import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import HotPetitons from 'Theme/hot-petitions'
import { loadTopPetitions } from '../actions/petitionActions'

class TopPetitions extends React.Component {
  componentDidMount() {
    const { pac, loadPetitions } = this.props
    loadPetitions(pac)
  }

  render() {
    const { topPetitions, source, className } = this.props
    return (
      <HotPetitons
        topPetitions={topPetitions}
        source={source}
        className={className}
      />
    )
  }
}

TopPetitions.propTypes = {
  pac: PropTypes.bool,
  source: PropTypes.string,
  topPetitions: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loadPetitions: PropTypes.func,
  className: PropTypes.string
}

const mapStateToProps = (store, ownProps) => {
  const topPetitionsState = store.petitionStore.topPetitions || {}

  const topPetitionsKey = `${ownProps.pac ? 1 : 0}--`
  const topPetitionIds = topPetitionsState[topPetitionsKey] || []

  return {
    topPetitions: topPetitionIds.map(
      petitionId => store.petitionStore.petitions[petitionId]
    )
  }
}

const mapDispatchToProps = dispatch => ({
  loadPetitions: pac => dispatch(loadTopPetitions(pac))
})

export default connect(mapStateToProps, mapDispatchToProps)(TopPetitions)
