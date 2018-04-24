import React from 'react'
import PropTypes from 'prop-types'
import Config from '../config'

export const Logo = () => (
  <a href='https://front.moveon.org/' className='logo'>
    <img src={`${Config.STATIC_ROOT}images/logo.svg`} alt='MoveOn Logo' />
  </a>
)

Logo.propTypes = {
  className: PropTypes.string
}

export default Logo
