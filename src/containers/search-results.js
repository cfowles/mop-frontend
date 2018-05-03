import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { searchPetitions } from '../actions/petitionActions'

import SearchResultsComponent from 'LegacyTheme/search-results'

class SearchResults extends React.Component {
  componentDidMount() {
    // guarding for a cold page reload: check to see if we have search results, and if not load them
    if (this.props.searchResults !== undefined) {
      this.props.searchPetitions(
        this.props.query,
        this.props.pageNumber,
        this.props.selectState
      )
    }
  }

  componentDidUpdate() {
    const bodyTop = document.body.getBoundingClientRect().top
    let resultsTop = 0
    if (this.resultsDiv) {
      resultsTop = this.resultsDiv.getBoundingClientRect().top
    }
    window.scrollTo(0, resultsTop - bodyTop)
  }

  render() {
    const { searchResults, currentPage, query } = this.props

    return (
      <SearchResultsComponent
        results={searchResults._embed}
        resultsCount={Number(searchResults.count || 0)}
        searchNavLinks={searchResults._links}
        pageSize={searchResults.page_size}
        currentPage={currentPage}
        query={query}
        setResultsRef={div => { this.resultsDiv = div }}
      />
    )
  }
}

SearchResults.propTypes = {
  searchResults: PropTypes.object,
  currentPage: PropTypes.number,
  query: PropTypes.string,
  searchPetitions: PropTypes.func,
  pageNumber: PropTypes.string,
  selectState: PropTypes.string
}

const mapStateToProps = (store, ownProps) => {
  const searchResults = store.petitionSearchStore.searchResults

  return {
    searchResults,
    currentPage: parseInt(ownProps.pageNumber, 10)
  }
}

const mapDispatchToProps = dispatch => ({
  searchPetitions: (query, pageNumber, selectState) =>
    dispatch(searchPetitions(query, pageNumber, selectState))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
