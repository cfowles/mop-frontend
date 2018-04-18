import React from 'react'
import PropTypes from 'prop-types'

import Config from '../../config'

// See /docs/EXPLANATION--error-handling.md for how errors can be shown
export const Error404 = ({ error: { description } }) => (
  <div className='container'>
    <div className='row my-5'>
      <div className='col-12'>
        <h1 className='text-align-center'>
          Oops — looks like what you’re looking for isn’t here!
        </h1>
        <p className='text-align-center'>
          {description}
          {!description && (
            <span>
              Email us at <a href='mailto:help@moveon.org'>help@moveon.org</a>{' '}
              so we can help you find your way.
            </span>
          )}
        </p>
        <img
          src={`${Config.STATIC_ROOT}images/error404.svg`}
          alt='404 error'
        />
      </div>
    </div>
  </div>
)

Error404.defaultProps = { error: {} }
Error404.propTypes = { error: PropTypes.object }
