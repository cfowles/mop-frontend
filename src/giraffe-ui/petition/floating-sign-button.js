import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import Scrollchor from 'react-scrollchor'

export const FloatingSignButton = ({ getScrollProps, visible }) => (
  <div
    className={cx('sign-form__fixed-button', {
      'sign-form__fixed-button--hidden': !visible
    })}
  >
    <Scrollchor disableHistory {...getScrollProps()}>
      <button>Sign The Petition</button>
    </Scrollchor>
  </div>
)

FloatingSignButton.propTypes = {
  getScrollProps: PropTypes.func,
  visible: PropTypes.bool
}
