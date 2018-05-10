import React from 'react'
import PropTypes from 'prop-types'

const RegisterForm = ({ errorList, handleSubmit, setRef }) => (
  <div className='container'>
    <div className='row'>
      <div className='span6 offset3'>
        <div className='well login clearfix'>
          <h1 className='lanky-header size-xl'>Quick sign up</h1>

          <ul className='errors'>{errorList && errorList()}</ul>

          <form
            method='POST'
            onSubmit={handleSubmit}
            className='form-horizontal'
          >
            <input
              ref={setRef}
              name='name'
              className='percent-80 validation_error'
              type='text'
              id='inputName'
              placeholder='Name'
            />
            <input
              ref={setRef}
              name='email'
              className='percent-80 validation_error'
              type='text'
              id='inputEmail'
              placeholder='Email'
            />
            <input
              name='password'
              ref={setRef}
              className='percent-80 validation_error'
              type='password'
              id='inputPassword'
              placeholder='Password'
            />
            <input
              name='passwordConfirm'
              ref={setRef}
              className='percent-80 validation_error'
              type='password'
              id='inputConfirm'
              placeholder='Confirm Password'
            />
            <div>
              <div className='bump-bottom-2'>
                <input
                  value='Register'
                  className='button bump-top-2'
                  type='submit'
                />
              </div>
              <ul className='unstyled inline'>
                <li className='disclaimer'>
                  By creating an account you agree to receive email messages
                  from MoveOn.org Civic Action and MoveOn.org Political Action.
                  You may unsubscribe at any time.
                </li>
              </ul>
            </div>
          </form>
        </div>

        <div className='disclaimer' id='privacy'>
          <p>
            <strong>Privacy Policy (the basics)</strong>:<br />
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
            <a href='http://petitions.moveon.org/privacy.html' target='_blank' rel='noopener noreferrer'>
              click here
            </a>.
          </p>
        </div>
      </div>
    </div>
  </div>
)

RegisterForm.propTypes = {
  errorList: PropTypes.func,
  handleSubmit: PropTypes.func,
  setRef: PropTypes.func
}

export default RegisterForm
