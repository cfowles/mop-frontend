import React from 'react'
import PropTypes from 'prop-types'

import Config from '../../config'

export const Error500 = ({ error: { description } }) => (
  <div className='container'>
    <div className='row my-5'>
      <div className='col-12 col-md-7'>
        <h1 className='text-align-center'>
          Uh-oh — it looks like something went wrong
        </h1>
        <p className='text-align-center'>
          {description}
          {!description && (
            <span>
              We’re sorry about that! Please go back and try again. If you’re
              still having trouble, shoot us a note at{' '}
              <a href='mailto:help@moveon.org'>help@moveon.org</a>.
            </span>
          )}
        </p>
      </div>
      <div className='col-12 col-md-5 order-md-first'>
        <img
          src={`${Config.STATIC_ROOT}error500.svg`}
          alt='500 error'
        />
      </div>
    </div>
  </div>
)

Error500.defaultProps = { error: {} }
Error500.propTypes = { error: PropTypes.object }
