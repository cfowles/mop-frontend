import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SignatureListPage from 'Theme/signature-list-page'
import { NextButton, PreviousButton, Pager } from 'Theme/signature-list-pagination'
import { loadPetitionSignatures } from '../actions/petitionActions.js'

class SignatureList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { page: 1 }
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
  }

  componentDidMount() {
    this.loadSignaturesIfNeeded(this.state.page)
  }

  loadSignaturesIfNeeded(page) {
    const { loadSignatures, signatures, petition } = this.props
    if (typeof signatures === 'undefined' || typeof signatures[page] === 'undefined') {
      loadSignatures(petition, page)
    }
  }

  nextPage() {
    this.loadSignaturesIfNeeded(this.state.page + 1)
    this.setState((prevState) => ({
      page: prevState.page + 1
    }))
  }

  previousPage() {
    this.loadSignaturesIfNeeded(this.state.page - 1)
    this.setState((prevState) => ({
      page: prevState.page - 1
    }))
  }

  render() {
    const { signatures, signatureCount } = this.props
    const { page } = this.state
    if (typeof signatures === 'undefined' || typeof signatures[page] === 'undefined') {
      return (
        <div id='pet-signers-loading' className='bump-top-1'><b>Loading...</b></div>
      )
    }
    const startIndex = (page - 1) * 10
    const startNumber = signatureCount - startIndex
    const previousButton = (
      <PreviousButton onClick={this.previousPage} visible={page >= 2} />
    )
    const nextButton = (
      <NextButton
        onClick={this.nextPage}
        visible={startIndex + 10 < signatureCount}
      />
    )
    return (
      <div>
        <SignatureListPage
          signatures={signatures[page]}
          startNumber={startNumber}
        />
        <Pager
          previousButton={previousButton}
          nextButton={nextButton}
        />
      </div>
    )
  }
}

SignatureList.propTypes = {
  petition: PropTypes.object,
  signatureCount: PropTypes.number,
  signatures: PropTypes.object,
  loadSignatures: PropTypes.func
}

const mapStateToProps = (store, ownProps) => ({
  signatures: store.petitionStore.petitionSignatures[ownProps.petition.name]
})

const mapDispatchToProps = (dispatch) => ({
  loadSignatures: (petition, page) =>
    dispatch(loadPetitionSignatures(petition, page))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignatureList)
