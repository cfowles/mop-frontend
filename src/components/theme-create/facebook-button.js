import React from 'react'
import PropTypes from 'prop-types'

import { withFacebook } from '../../containers/hoc-facebook'
import FacebookSvg from 'GiraffeUI/svgs/facebook.svg'

const FacebookButton = ({ onClick }) => (
  <a className='petition-thanks__cta' onClick={onClick}>
    <FacebookSvg />
    Share on Facebook
  </a>
)

FacebookButton.propTypes = {
  onClick: PropTypes.func
}

export default withFacebook(FacebookButton)
