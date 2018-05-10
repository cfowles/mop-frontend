import React from 'react'
import PropTypes from 'prop-types'

const Static = ({ children }) => (
  <div className='container'>
    <div className='row justify-content-center my-4 my-md-5'>
      <div className='col-12 col-md-10'>{children}</div>
    </div>
  </div>
)

Static.propTypes = { children: PropTypes.node }

export default Static
