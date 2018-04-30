import React from 'react'
import PropTypes from 'prop-types'
import Config from '../config'

const inlineLogo = document.getElementById('mologo')

export const Logo = ({ className }) => (
  <a href='https://front.moveon.org/' className={`logo ${className}`}>
    {inlineLogo ? (
      <svg alt='MoveOn Logo'>
        <use xlinkHref='#mologo' />
      </svg>
    ) : (
      <img src={`${Config.STATIC_ROOT}images/logo.svg`} alt='MoveOn Logo' />
    )}
  </a>
)

Logo.propTypes = {
  className: PropTypes.string
}

export default Logo
