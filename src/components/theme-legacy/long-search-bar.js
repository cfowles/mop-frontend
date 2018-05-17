import React from 'react'
import PropTypes from 'prop-types'

import StateSelect from './form/state-select'

const smallStateSelectStyle = {
  display: 'inline',
  width: '100px'
}

const LongSearchBar = ({ submit, queryValue, stateValue, changeQueryValue, changeQueryState }) => (
  <div id='search-bar-large' className='container'>
    <div className='row'>
      <div className='span7 control-group bump-top-1'>
        <form className='search' onSubmit={submit}>
          <div className='search'>
            <input id='searchValue' value={queryValue} placeholder='Search Petitions' onChange={changeQueryValue} type='text' className='margin-right-1 ' />
            <StateSelect selectText='All States' style={smallStateSelectStyle} onChange={changeQueryState} value={stateValue} />
            <button type='submit' className='background-moveon-dark-blue margin-left-1'>Search</button>
          </div>
        </form>
      </div>
      <div className='span5'>
        <p className='lanky-header size-medium-large lh-24 bump-top-1'>Search for petitions by any keyword.</p>
      </div>
    </div>
  </div>
)

LongSearchBar.propTypes = {
  submit: PropTypes.func,
  queryValue: PropTypes.string,
  stateValue: PropTypes.string,
  changeQueryValue: PropTypes.func,
  changeQueryState: PropTypes.func
}

export default LongSearchBar
