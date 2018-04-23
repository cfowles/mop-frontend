import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

export const NavLink = ({ to, href, children }) => (
  <li>
    {to && <Link to={to}>{children}</Link>}
    {!to && href && <a href={href}>{children}</a>}
  </li>
)

NavLink.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node
}
