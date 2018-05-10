import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import { StateSelect } from 'GiraffeUI/petition'

const LongSearchBar = ({
  submit,
  queryValue,
  stateValue,
  changeQueryValue,
  changeQueryState,
  className
}) => (
  <form className={cx('row', 'searchbar', className)} onSubmit={submit}>
    <div className='col-12 col-md-7 mb-3 mb-md-0'>
      <input
        value={queryValue}
        placeholder='Search for petitions by keywords'
        onChange={changeQueryValue}
        type='text'
        className='border pl-2'
      />
    </div>
    <div className='col-6 col-md-3'>
      <StateSelect
        className='input-inline input-inline--large'
        placeholder='All States'
        onChange={changeQueryState}
        value={stateValue}
        inline
      />
    </div>
    <div className='col-6 col-md-2'>
      <button
        type='submit'
        className='btn'
      >
        Search
      </button>
    </div>
  </form>
)

LongSearchBar.propTypes = {
  submit: PropTypes.func,
  queryValue: PropTypes.string,
  stateValue: PropTypes.string,
  changeQueryValue: PropTypes.func,
  changeQueryState: PropTypes.func,
  className: PropTypes.string
}

export default LongSearchBar
