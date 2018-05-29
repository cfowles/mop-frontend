import React from 'react'
import PropTypes from 'prop-types'

const Email = ({emailOnChange}) => (
  <div>
    <div className='bubble'>I’ll ask you a few questions that will help build your petition in minutes.
    </div>
    <div className='bubble'>Let’s get started! Can you enter your email so you don’t lose your progress?
    </div>
    <div className='bubble user'>
      <input
        type='email'
        name='email'
        placeholder='your@email.com'
        onChange={emailOnChange}
        onBlur={emailOnChange}
      />
    </div>
  </div>
)

Email.propTypes = {
  emailOnChange: PropTypes.func,
  emailValidationError: PropTypes.element
}

export default Email
