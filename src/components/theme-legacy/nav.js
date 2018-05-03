/* eslint-disable react/jsx-indent */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import classNames from 'classnames'

import NavLink from 'LegacyTheme/nav-link'
import CobrandLogo from '../../containers/cobrand-logo'

const Nav = ({ user, minimal, toggleOpen, onLogout, isOpenMobile, entity }) => {
  const ulClassNames = classNames({
    nav: true,
    'collapse nav-collapse': !isOpenMobile
  })

  const userLinks = (
    <div className='pull-right bump-top-1 span-7 top-menu'>
      <ul className={ulClassNames}>
        <NavLink to='/admin'>Admin</NavLink>
        <NavLink to='/campaign_tips.html'>Campaign Tips</NavLink>
        <NavLink to='/edit_account.html'>Edit account</NavLink>
        <NavLink onClick={onLogout}>Logout</NavLink>
        <NavLink to='https://civic.moveon.org/donatec4/creditcard.html?cpn_id=511'>Donate</NavLink>
      </ul>
    </div>
  )

  const guestLinks = (
    <div className='pull-right bump-top-1 span-7 top-menu'>
      <ul className={ulClassNames}>
        <NavLink to='/campaign_tips.html'>Campaign Tips</NavLink>
        <NavLink to='/about.html'>About</NavLink>
        <NavLink to='https://civic.moveon.org/donatec4/creditcard.html?cpn_id=511'>Donate</NavLink>
      </ul>
    </div>
  )

  const userDashboardLink = (
    <Link className='icon-link-narrow icon-managepetitions' to='/dashboard.html?source=topnav'> {`${user.given_name}’s`} Dashboard</Link>
  )

  const guestDashboardLink = (
    <Link className='icon-link-narrow icon-managepetitions' to='/dashboard.html?source=topnav'>Manage Petitions</Link>
  )

  return (
    <div>
      <div className='container' id='header'>
        <div className='row'>
          <div className='moveon-masthead pull-left hidden-phone'>
            <Link to='/'>MoveOn.org</Link>
          </div>

          <div className='mobile visible-phone'>
            <div className='moveon-masthead pull-left'>
              <Link to='/'>MoveOn.org</Link>
            </div>
          </div>

          {!minimal
            ? ( // when not minimal, we have a bunch of links for you!
            <div>
              <div className='pull-left top-icons hidden-phone'>
                <div className='pull-left span2 petitions-partner-logo bump-top-1 margin-right-2 hidden-phone'>
                  <CobrandLogo />
                </div>
                <Link className='icon-link-narrow icon-start' to='/create_start.html?source=topnav'>Start a petition</Link>
                {user.given_name ? userDashboardLink : guestDashboardLink}
              </div>

              <div className='pull-left top-icons visible-phone'>
                <Link className='icon-link-narrow icon-start' to='/create_start.html?source=topnav-mobile' />
                <Link className='icon-link-narrow icon-managepetitions' to='/dashboard.html' />
              </div>

              <Link className='btn visible-phone pull-right bump-top-2' onClick={toggleOpen} >
                <span className='icon-th-list' />
              </Link>

              {user.signonId ? userLinks : guestLinks}
            </div>
            ) : null}
        {entity === 'pac' && (
          <div
            className='span12 bold-header moveon-medium-gray size-small hidden-phone'
            style={{ marginTop: '-5px', marginBottom: '25px', paddingLeft: '90px' }}
          >
            <em>Political Action Edition</em>
          </div>
        )}
        </div>
      </div>
      <div className='container visible-phone'>
        <div className='row pull-left'>
          <div className='pull-left span2 petitions-partner-logo bump-top-1 margin-right-2'>
            <CobrandLogo />
          </div>
        </div>
      </div>
    </div>
  )
}

Nav.propTypes = {
  user: PropTypes.object,
  minimal: PropTypes.bool,
  toggleOpen: PropTypes.func,
  isOpenMobile: PropTypes.bool,
  entity: PropTypes.string,
  onLogout: PropTypes.func
}

export default Nav
