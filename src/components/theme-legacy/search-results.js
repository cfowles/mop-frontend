import React from 'react'
import PropTypes from 'prop-types'

import SearchResultPagination from '../../containers/search-result-pagination'

const SearchResults = ({
  results,
  resultsCount,
  pageSize,
  currentPage,
  searchNavLinks,
  query,
  setResultsRef
}) => {
  const resultsList = results.map(result => (
    <div className='result search-page' key={result.short_name}>
      <div className='result-text'>
        <p className='result-name'>
          <a
            className='size-medium-large font-heavy'
            href={`https://pac.petitions.moveon.org/sign/${
              result.short_name
            }/?source=search`}
          >
            {result.name}
          </a>
        </p>
        <p className='size-small'>
          https://pac.petitions.moveon.org/sign/{result.short_name}/
        </p>
        <p className='size-medium'>{result.blurb}...</p>
      </div>
    </div>
  ))

  return (
    <div
      id='search-results'
      ref={setResultsRef}
    >
      {resultsList}
      <SearchResultPagination
        resultsCount={resultsCount}
        pageSize={pageSize}
        currentPage={currentPage}
        searchNavLinks={searchNavLinks}
        query={query}
      />
    </div>
  )
}

SearchResults.propTypes = {
  results: PropTypes.array,
  resultsCount: PropTypes.number,
  currentPage: PropTypes.number,
  query: PropTypes.string,
  searchNavLinks: PropTypes.object,
  pageSize: PropTypes.number,
  setResultsRef: PropTypes.func
}

export default SearchResults
