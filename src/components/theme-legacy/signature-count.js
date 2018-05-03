import React from 'react'
import PropTypes from 'prop-types'

import { formatNumber, percent } from '../../lib'

const SignatureCount = ({ current, goal }) => current !== undefined && (
  <div id='therm' className='span7 margin-left-0 bump-top-2'>
    <div className='muted'>
      There are currently <span className='featured pull-right1 progress-current'>{formatNumber(current)}</span> signatures.
      NEW goal - We need <span className='progress-goal'>{formatNumber(goal)}</span> signatures.
    </div>
    <div className='progress progress-danger no-bottom-margin'>
      <div className='bar' style={{ width: percent(current, goal) }} />
    </div>
  </div>
)

SignatureCount.propTypes = {
  current: PropTypes.number,
  goal: PropTypes.number
}

export default SignatureCount
