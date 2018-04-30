import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { getRegions, armedForcesRegions } from '../../lib'

import CaretDownSvg from '../svgs/caret-down.svg'

export const StateSelect = ({ label, placeholder, onChange, className, onlyStates }) => (
  <div className={cx('input-block', className)}>
    <select name='state' id='state' onChange={onChange}>
      <option>{placeholder}</option>
      {getRegions(onlyStates).map(([val, text]) => (
        <option key={val} value={val}>
          {text}
        </option>
      ))}
      {!onlyStates &&
        armedForcesRegions.map(([val, text]) => (
          <option key={text} value={val}>
            {text}
          </option>
        ))}
    </select>
    <CaretDownSvg className='select-caret' />
    {label && <label htmlFor='country'>{label}</label>}
  </div>
)

StateSelect.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  onlyStates: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string
}
