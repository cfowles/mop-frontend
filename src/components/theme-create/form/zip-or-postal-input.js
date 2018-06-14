import React from 'react'
import PropTypes from 'prop-types'

const ZipOrPostalInput = ({ country, zipOnChange, zipValidationError, postalOnChange }) => {
  if (country === 'United States') {
    return (
      <div>
        <input
          type='text'
          name='zip'
          placeholder='ZIP Code*'
          className='zip moveon-track-click'
          onChange={zipOnChange}
          onBlur={zipOnChange}
        />
        <zipValidationError />
      </div>
    )
  }
  return (
    <input
      type='text'
      name='postal'
      placeholder='Postal'
      className='postal moveon-track-click'
      onChange={postalOnChange}
      onBlur={postalOnChange}
    />
  )
}

ZipOrPostalInput.propTypes = {
  country: PropTypes.string,
  postalOnChange: PropTypes.func,
  zipOnChange: PropTypes.func,
  zipValidationError: PropTypes.element
}

export default ZipOrPostalInput
