import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { MoNavContext } from './header'

import CloseSvg from '../svgs/close.svg'

export const MoNav = ({ children }) => (
  <MoNavContext.Consumer>
    {({ isOpenMobile, close }) => (
      <div
        id='nav'
        className={classNames('mo-nav', { 'nav--visible': isOpenMobile })}
      >
        <span className='mo-nav__title'>Menu</span>
        {children}
        <button onClick={close} className='mo-nav__close'>
          <CloseSvg />
        </button>
      </div>
    )}
  </MoNavContext.Consumer>
)

MoNav.propTypes = {
  children: PropTypes.node
}
