import React from 'react'
import PropTypes from 'prop-types'

import { InputBlock } from 'GiraffeUI/input-block'
import { Submit } from 'GiraffeUI/button'

const RegisterForm = ({ errorList, handleSubmit, setRef, isSubmitting }) => (
  <div className='container'>
    <div className='row justify-content-center mt-3'>
      <div className='col-md-6'>
        <h1 className='text-align-center mt-5 mb-3'>Quick Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <div className='bg-ice-blue p-4'>
            <InputBlock
              name='name'
              label='Name'
              setRef={setRef}
              className='mt-0'
              labelBefore
            />
            <InputBlock
              type='email'
              name='email'
              label='Email'
              setRef={setRef}
              labelBefore
            />
            <InputBlock
              type='password'
              name='password'
              label='Password'
              setRef={setRef}
              labelBefore
            />
            <InputBlock
              type='password'
              name='passwordConfirm'
              label='Confirm Password'
              setRef={setRef}
              labelBefore
            />
          </div>
          <div className='buttons text-align-center'>
            <Submit disabled={isSubmitting}>
              {isSubmitting ? 'Please wait...' : 'Register'}
            </Submit>
            <ul className='mt-3 red errors'>{errorList && errorList()}</ul>
          </div>
        </form>

        <p>
          <small>
            By creating an account you agree to receive email messages from
            MoveOn.org Civic Action and MoveOn.org Political Action. You may
            unsubscribe at any time.
          </small>
        </p>
        <p>
          <small>
            <strong>Privacy Policy (the basics):</strong>
            <br />{' '}
            <strong>
              MoveOn will never sell your personal information to anyone ever.
            </strong>{' '}
            For petitions, letters to the editor, and surveys you’ve signed or
            completed, we treat your name, city, state, and comments as public
            information, which means anyone can access and view it. We will not
            make your street address publicly available, but we may transmit it
            to your state legislators, governor, members of Congress, or the
            President as part of a petition. MoveOn will send you updates on
            this and other important campaigns by email. If at any time you
            would like to unsubscribe from our email list, you may do so. For
            our complete privacy policy,{' '}
            <a href='http://petitions.moveon.org/privacy.html' target='_blank'>
              click here
            </a>.
          </small>
        </p>
      </div>
    </div>
  </div>
)

RegisterForm.propTypes = {
  errorList: PropTypes.func,
  handleSubmit: PropTypes.func,
  setRef: PropTypes.func,
  isSubmitting: PropTypes.bool
}

export default RegisterForm
