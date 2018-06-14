import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

export const PreviousButton = ({ onClick, visible }) => (
  <button
    onClick={onClick}
    className={cx('mo-btn', { hidden: !visible })}
  >
    Previous
  </button>
)
PreviousButton.propTypes = { onClick: PropTypes.func, visible: PropTypes.bool }

export const NextButton = ({ onClick, visible }) => (
  <button
    onClick={onClick}
    className={cx('mo-btn', { hidden: !visible })}

  >
    Next
  </button>
)
NextButton.propTypes = { onClick: PropTypes.func, visible: PropTypes.bool }

export const Pager = ({ previousButton, nextButton }) => (
  <div className='petition-details__comments__pagination'>
    {previousButton}
    {nextButton}
  </div>
)
Pager.propTypes = {
  previousButton: PropTypes.node,
  nextButton: PropTypes.node
}
