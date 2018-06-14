import React from 'react'
import PropTypes from 'prop-types'
import { countries } from '../../../lib/countries'

const CountrySelect = ({ value, onChange }) => (
  <select
    name='country'
    className='span4 country_select moveon-track-click'
    value={value}
    onChange={onChange}
  >
    {countries.map((name, i) => <option key={i}>{name}</option>)}
  </select>
)

CountrySelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default CountrySelect
