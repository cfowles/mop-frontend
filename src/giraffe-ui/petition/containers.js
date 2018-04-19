import React from 'react'
import PropTypes from 'prop-types'

export const Container = ({ children }) => (
  <div className='row mt-4 mt-md-5 mx-1'>{children}</div>
)
Container.propTypes = { children: PropTypes.node }

export const InfoColumn = ({ children }) => (
  <div className='col-12 col-lg-7 petition-info-column'>
    <div className='justify-content-center row'>{children}</div>
  </div>
)
InfoColumn.propTypes = { children: PropTypes.node }

export const SignColumn = ({ children }) => (
  <div className='col-lg-5 mt-4 petition-sign-column'>{children}</div>
)
SignColumn.propTypes = { children: PropTypes.node }

export const MobileSign = ({ children }) => (
  <div className='petition-sign-inline col-10 mt-5'>{children}</div>
)
MobileSign.propTypes = { children: PropTypes.node }
