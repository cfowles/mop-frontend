import React from 'react'
import PropTypes from 'prop-types'
import Config from '../config'

const inlineLogo = document.getElementById('mologo')

export const Logo = () => (
  <a href='https://front.moveon.org/' className='logo'>
    {inlineLogo
     ? <svg className='header-logo' alt='MoveOn Logo'><use xlinkHref='#mologo' /></svg>
     : <img src={`${Config.STATIC_ROOT}images/logo.svg`} alt='MoveOn Logo' />
    }
  </a>
)

Logo.propTypes = {
  className: PropTypes.string
}

export default Logo
