import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import { InputMaterial } from 'GiraffeUI/input-material'
import { Submit } from 'GiraffeUI/button'

const LoginForm = ({ setRef, errorList, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleLoginSubmit}>
          <div className='row'>
            <InputMaterial
              type='text'
              name='email'
              label='Email'
              stateRef={email}
              onChange={updateStateFromValue('email')}
            />
            <InputMaterial
              type='password'
              name='password'
              label='Password'
              stateRef={password}
              onChange={updateStateFromValue('passwordConfirm')}
            />
            /*
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
            */
          </div>
          <div className='buttons text-align-center'>
            {/*<Submit disabled={isSubmitting}>
              {isSubmitting ? 'Please wait...' : 'Next'}
            </Submit>*/}
            <button
                type="submit"
                className="center display-block ppp-btn btn"
                value="Preview The Petition"
                name="login_next"
                id="login_next"
                >
                Next
            </button>
            <ul className='mt-3 red errors'>{errorList && errorList()}</ul>
          </div>
        </form>
)

LoginForm.propTypes = {
  errorList: PropTypes.func,
  handleSubmit: PropTypes.func,
  setRef: PropTypes.func,
  isSubmitting: PropTypes.bool
}

export default LoginForm
