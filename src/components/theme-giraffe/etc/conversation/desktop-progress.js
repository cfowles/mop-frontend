import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Check from '../../../../giraffe-ui/svgs/check.svg'

const DesktopProgress = ({ getStateValue }) => {
const section = getStateValue('section')
return (
  <div>
    <div className='progress-wrap'>
      <h3>Check your progress!</h3>
      <div className={cx(
          'step', section === 1 ? 'step-active' : '', section > 1 ? 'step-complete' : ''
      )}
      >
        Petition Title
        <span className='checkmark'>
          <Check />
        </span>
      </div>
      <div className={cx(
          'step', section === 2 ? 'step-active' : '', section > 2 ? 'step-complete' : ''
      )}
      >
        Petition Statement
        <span className='checkmark'>
          <Check />
        </span>
      </div>
      <div className={cx(
          'step', section === 3 ? 'step-active' : '', section > 3 ? 'step-complete' : ''
      )}
      >
        Petition Background
        <span className='checkmark'>
          <Check />
        </span>
      </div>
      <div className={cx(
          'step', section === 4 ? 'step-active' : '', section > 4 ? 'step-complete' : ''
      )}
      >
        Decision Maker
        <span className='checkmark'>
          <Check />
        </span>
      </div>
      <div className={cx(
          'step', section === 5 ? 'step-active' : '', section > 5 ? 'step-complete' : ''
      )}
      >
        All Published <span role='img' aria-label='celebrate'>🎉</span>
      </div>
    </div>
  </div>
)
}
DesktopProgress.propTypes = {
  getStateValue: PropTypes.func
}

export default DesktopProgress
