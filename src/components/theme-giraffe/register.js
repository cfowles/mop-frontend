import React from 'react'
import RegisterForm from '../../containers/register-form'

export const Register = () => (
  <div className='container'>
    <div className='row justify-content-center mt-3'>
      <div className='col-md-6'>
        <h1 className='text-align-center mt-5 mb-3'>Quick Sign Up</h1>
        <RegisterForm />
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
            <br />
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
            <a
              href='http://petitions.moveon.org/privacy.html'
              target='_blank'
              rel='noopener noreferrer'
            >
              click here
            </a>.
          </small>
        </p>
      </div>
    </div>
  </div>
)

Register.propTypes = {}

export default Register
