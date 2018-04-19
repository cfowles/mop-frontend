import React from 'react'
import PropTypes from 'prop-types'
import Nav from '../../containers/nav'
import Footer from 'Theme/footer'

const Wrapper = ({ children, organization, minimalNav, entity }) => (
  <div id='giraffe-wrapper' className='giraffe petition'>
    <Nav organization={organization} minimal={minimalNav} entity={entity} />
    <main id='content'>{children}</main>
    <Footer entity={entity} />
  </div>
)

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  organization: PropTypes.string,
  minimalNav: PropTypes.bool,
  entity: PropTypes.string
}

export default Wrapper
