import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'

const NavLink = ({ to, children, onClick }) => (
  <li>
    <Link className='lh-14 navlink' to={to} onClick={onClick}>
      {children}
    </Link>
  </li>
)

NavLink.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node
}

export default NavLink
