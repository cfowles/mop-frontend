import React from 'react'
import PropTypes from 'prop-types'
import ChatBubble from './chat-bubble'

const Email = ({
  emailOnChange,
  section,
  nextSection
}) => (
  <div>
    <ChatBubble section={section} />
    <div className='bubble user'>
      <input
        type='email'
        name='email'
        placeholder='your@email.com'
        onChange={emailOnChange}
        onBlur={emailOnChange}
      />
    <a className='bubble-submit' onClick={nextSection()}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </a>
    </div>
  </div>
)

Email.propTypes = {
  emailOnChange: PropTypes.func,
  emailValidationError: PropTypes.element
}

export default Email
