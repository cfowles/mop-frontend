import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { MoNavContext } from './header'

export const NavLink = ({ to, href, children }) => {
  if (href) {
    // render an external link
    return (
      <li>
        <a href={href}>{children}</a>
      </li>
    )
  }

  // render an internal link that also closes the mobile menu
  return (
    <li>
      <MoNavContext.Consumer>
        {({ close }) => (
          <Link to={to} onClick={close}>
            {children}
          </Link>
        )}
      </MoNavContext.Consumer>
    </li>
  )
}

NavLink.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node
}
