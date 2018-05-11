import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const LoginForm = ({ setRef, errorList, handleSubmit, isSubmitting }) => (
  <div className='container'>
    <div className='row'>
      <div className='span6 offset3'>
        <div className='well login clearfix'>
          <h1 className='lanky-header size-xl'>It’s time to log in!</h1>

          <ul className='errors'>
            {errorList && errorList()}
          </ul>

          <form method='POST' onSubmit={handleSubmit}>
            <input
              ref={setRef}
              type='text'
              name='email'
              placeholder='Email'
            />
            <input
              ref={setRef}
              type='password'
              name='password'
              placeholder='Password'
            />
            <div>
              <div className='bump-bottom-2'>
                <input
                  value={isSubmitting ? 'Please wait...' : 'Login'}
                  disabled={isSubmitting}
                  type='submit'
                  className='button bump-top-2'
                />
              </div>
              <ul className='unstyled inline size-small'>
                <li>
                  <Link to='/login/forgot_password.html'>
                    Forgot your password?
                  </Link>
                </li>
                <li>
                  Never used MoveOn’s petition website?{' '}
                  <Link to='/login/register.html'>Sign up now.</Link>
                </li>
              </ul>
            </div>
          </form>
        </div>
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
