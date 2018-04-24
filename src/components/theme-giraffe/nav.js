import React from 'react'
import PropTypes from 'prop-types'

import Logo from 'GiraffeUI/logo'
import { Primary, Secondary, NavLink, Header, MoNav } from 'GiraffeUI/nav'

import DocumentSvg from 'GiraffeUI/svgs/document-add.svg'

const Nav = ({
  toggleOpen,
  close,
  isOpenMobile,
  openSections,
  toggleSection,
  minimal
}) => (
  <Header toggleOpen={toggleOpen}>
    <Logo />
    {!minimal && (
      <MoNav isOpenMobile={isOpenMobile} close={close}>
        <Primary openSections={openSections} toggleSection={toggleSection}>
          <Primary.Section name='Petitions'>
            <NavLink to='/'>Browse Petitions</NavLink>
            <NavLink to='/create_start.html?source=topnav'>
              Start A Petition
            </NavLink>
          </Primary.Section>

          <Primary.Section name='Campaigns'>
            <NavLink href='https://moveon.org/browse-campaigns'>
              Browse Campaigns
            </NavLink>
            <NavLink to='/campaign_tips.html'>Campaign Tips</NavLink>
            <NavLink href='https://moveon.org/our-impact'>Our Impact</NavLink>
          </Primary.Section>

          {/* More Top level */}
          <NavLink href='https://moveon.org/events'>Events</NavLink>
          <NavLink href='https://front.moveon.org/about'>About Us</NavLink>
        </Primary>
        <Secondary>
          <Secondary.Top>
            <NavLink href='https://front.moveon.org/blog'>News</NavLink>
            <NavLink href='https://store.moveon.org'>Store</NavLink>
          </Secondary.Top>
          <Secondary.Bottom>
            <NavLink href='https://front.moveon.org/#join'>Join</NavLink>
            <NavLink href='https://act.moveon.org/donate/civ-donation?utm_source=petitions_nav&source=petitions_nav'>
              Donate
            </NavLink>
            <NavLink to='/create_start.html?source=topnav'>
              <DocumentSvg />Start A Petition
            </NavLink>
          </Secondary.Bottom>
        </Secondary>
      </MoNav>
    )}
  </Header>
)

Nav.propTypes = {
  user: PropTypes.object,
  nav: PropTypes.object,
  organization: PropTypes.string,
  minimal: PropTypes.bool,
  toggleOpen: PropTypes.func,
  close: PropTypes.func,
  isOpenMobile: PropTypes.bool,
  openSections: PropTypes.arrayOf(PropTypes.string),
  toggleSection: PropTypes.func
}

export default Nav
