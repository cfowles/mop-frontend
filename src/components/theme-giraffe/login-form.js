import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import { InputBlock } from 'GiraffeUI/input-block'
import { Submit } from 'GiraffeUI/button'

const LoginForm = ({ setRef, errorList, handleSubmit, isSubmitting }) => (
  <div className='container'>
    <div className='row justify-content-center mt-3'>
      <div className='col-md-6'>
        <h1 className='text-align-center mt-5 mb-3'>Log in</h1>

        <form onSubmit={handleSubmit}>
          <div className='bg-ice-blue p-4'>
            <InputBlock
              type='email'
              name='email'
              label='Email'
              setRef={setRef}
              className='mt-0'
              labelBefore
            />
            <InputBlock
              type='password'
              name='password'
              label='Password'
              setRef={setRef}
              labelBefore
            />
          </div>

          <div className='buttons text-align-center'>
            <Submit disabled={isSubmitting}>
              {isSubmitting ? 'Please wait...' : 'Log In'}
            </Submit>
            <ul className='mt-3 red errors'>
              {errorList && errorList()}
            </ul>
          </div>

          <p className='text-align-center'>
            <Link to='/login/forgot_password.html'>Forgot your password?</Link>
            <br />
            <Link to='/login/register.html'>Never logged in before?</Link>
          </p>
        </form>
      </div>
    </div>
  </div>
)

LoginForm.propTypes = {
  errorList: PropTypes.func,
  handleSubmit: PropTypes.func,
  setRef: PropTypes.func,
  isSubmitting: PropTypes.bool
}

export default LoginForm
