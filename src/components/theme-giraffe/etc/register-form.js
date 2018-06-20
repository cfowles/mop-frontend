import React from 'react'
import PropTypes from 'prop-types'

import { InputMaterial } from 'GiraffeUI/input-material'
import { Submit } from 'GiraffeUI/button'

const RegisterForm = ({ errorList, handleSubmit, setRef, isSubmitting, user, email, zip, name, password, passwordConfirm, updateStateFromValue }) => (
  <form onSubmit={handleSubmit}>
    <div className='row'>
      <InputMaterial
        name='name'
        type='text'
        placeholder='Name'
        stateRef={name}
        className='mt-0'
        onChange={updateStateFromValue('name')}
      />
      <InputMaterial
        type='email'
        name='email'
        placeholder='Email'
        stateRef={email}
        onChange={updateStateFromValue('email')}
      />
      <InputMaterial
        type='number'
        name='zip'
        placeholder='Zip'
        stateRef={zip}
        onChange={updateStateFromValue('zip')}
      />
      <InputMaterial
        type='password'
        name='password'
        placeholder='Password'
        stateRef={password}
        onChange={updateStateFromValue('password')}
      />
      <InputMaterial
        type='password'
        name='passwordConfirm'
        placeholder='Confirm Password'
        stateRef={passwordConfirm}
        onChange={updateStateFromValue('passwordConfirm')}
      />
    </div>
    <div className='buttons text-align-center'>
      {/*<Submit disabled={isSubmitting}>
        {isSubmitting ? 'Please wait...' : 'Next'}
      </Submit>*/}
      <button
          type="submit"
          className="center display-block ppp-btn btn"
          value="Preview The Petition"
          name="signup_next"
          id="signup_next"
          >
          Next
      </button>
      <ul className='mt-3 red errors'>{errorList && errorList()}</ul>
    </div>
  </form>
)

RegisterForm.propTypes = {
  errorList: PropTypes.func,
  handleSubmit: PropTypes.func,
  setRef: PropTypes.func,
  isSubmitting: PropTypes.bool
}

export default RegisterForm
