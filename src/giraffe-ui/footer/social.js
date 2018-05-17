import React from 'react'

import FacebookSvg from '../svgs/facebook.svg'
import TwitterSvg from '../svgs/twitter.svg'
import InstagramSvg from '../svgs/instagram.svg'

export const Social = () => (
  <div className='footer__social'>
    <a href='http://www.facebook.com/moveon'>
      <FacebookSvg />
    </a>
    <a href='http://www.twitter.com/moveon'>
      <TwitterSvg />
    </a>
    <a href='https://www.instagram.com/moveon'>
      <InstagramSvg />
    </a>
  </div>
)

export default Social
