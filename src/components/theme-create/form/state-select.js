import React from 'react'
import PropTypes from 'prop-types'
import { getRegions, armedForcesRegions } from '../../../lib'

const StateSelect = ({
  onChange,
  selectText,
  style,
  name = 'state',
  id = 'state_id',
  className = 'span4 state moveon-track-click margin-right-1',
  onlyStates = false
}) => {
  const regions = getRegions(onlyStates)
  return (
    <select
      name={name}
      id={id}
      className={className}
      onChange={onChange}
      style={style}
    >
      <option value=''>{selectText}</option>
      {regions.map(([val, text]) => (
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
  )
}

StateSelect.propTypes = {
  onChange: PropTypes.func,
  style: PropTypes.object,
  selectText: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  onlyStates: PropTypes.bool
}

export default StateSelect
