/* eslint-disable strict */ // Disabling check because we can't run strict mode. Need global vars.

import React from 'react'
import PropTypes from 'prop-types'
import Nav from '../../containers/nav'
import Footer from 'LegacyTheme/footer'

const Wrapper = ({ children, minimalNav, entity }) => (
  <div className='moveon-petitions'>
    <div id='message-portal'>
      {/* This div will be used to render petition message (currently the share redirect) in theme-legacy */}
    </div>
    <Nav minimal={minimalNav} entity={entity} />
    <main className='main'>{children}</main>
    <hr />
    <Footer entity={entity} />
  </div>
)

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  minimalNav: PropTypes.bool,
  entity: PropTypes.string
}

export default Wrapper
