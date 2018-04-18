import React from 'react'

// See /docs/EXPLANATION--error-handling.md for how errors can be shown
export const Error500 = () => (
  <div className='container background-moveon-white bump-top-1'>
    <div className='row'>
      <div className='span6 offset3'>
        <div className='well'>
          <h1 className='legend'>Something went wrong</h1>
          <p>
            We’re sorry, something went wrong. Please go back and try again. If
            you’re still having trouble, shoot us a note at{' '}
            <a href='mailto:help@moveon.org'>help@moveon.org</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
)
