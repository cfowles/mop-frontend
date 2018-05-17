import React from 'react'
import PropTypes from 'prop-types'
import CaretDownSvg from '../svgs/caret-down.svg'
import cx from 'classnames'
import { countries } from '../../lib/index'

export const CountrySelect = ({ value, onChange, className }) => (
  <div className={cx('input-block', className, { active: !!value })}>
    <select name='country' id='country' value={value} onChange={onChange}>
      {/* eslint-disable-next-line react/no-array-index-key */}
      {countries.map((name, i) => <option key={i}>{name}</option>)}
    </select>
    <CaretDownSvg className='select-caret' />
    <label htmlFor='country'>Country</label>
  </div>
)

CountrySelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string
}
