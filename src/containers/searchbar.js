import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions as petitionActions } from '../actions/petitionActions'
import { appLocation } from '../routes'

import ShortSearchBar from 'LegacyTheme/short-search-bar'
import LongSearchBar from 'Theme/long-search-bar'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: props.query || '',
      selectState: props.selectState || '',
      currentPage: props.currentPage || '1'
    }

    this.submitQuery = this.submitQuery.bind(this)
    this.selectState = this.selectState.bind(this)
    this.selectQuery = this.selectQuery.bind(this)
  }

  selectQuery(e) {
    e.preventDefault()
    const q = e.target.value
    this.setState({
      query: q
    })
  }

  selectState(e) {
    e.preventDefault()
    const selectedState = e.target.value
    this.setState({
      selectState: selectedState
    })
  }

  submitQuery(e) {
    e.preventDefault()
    const dispatch = this.props.dispatch

    const query = this.state.query
    const selState = this.state.selectState || ''
    const currentPage = this.state.currentPage || 1

    dispatch(petitionActions.searchPetitions(query, currentPage, selState))

    const queryString = []
    if (this.state.query) {
      queryString.push(`q=${this.state.query}`)
    }
    if (this.state.selectState) {
      queryString.push(`state=${this.state.selectState}`)
    }
    if (queryString.length) {
      const fullQuery = queryString.join('&')
      appLocation.push(`/find/?${fullQuery}`)
    }
  }

  render() {
    const { isLong, className } = this.props

    return isLong ? (
      <LongSearchBar
        className={className}
        submit={this.submitQuery}
        queryValue={this.state.query}
        stateValue={this.state.selectState}
        changeQueryValue={this.selectQuery}
        changeQueryState={this.selectState}
      />
    ) : (
      <ShortSearchBar
        classNames={className}
        submit={this.submitQuery}
        change={this.selectQuery}
        query={this.state.query}
      />
    )
  }
}

SearchBar.propTypes = {
  isLong: PropTypes.bool,
  query: PropTypes.string,
  currentPage: PropTypes.string,
  dispatch: PropTypes.func,
  selectState: PropTypes.string,
  className: PropTypes.string
}

export default connect()(SearchBar)
