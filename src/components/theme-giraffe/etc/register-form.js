import React from 'react'
import PropTypes from 'prop-types'

import { InputMaterial } from 'GiraffeUI/input-material'
import { Submit } from 'GiraffeUI/button'

const RegisterForm = ({ errorList, handleSubmit, getStateValue, updateStateFromValue, type }) => (
  <form onSubmit={handleSubmit}>
    <div className='row'>
      <InputMaterial
        name='name'
        type='text'
        label='Name'
        stateRef={getStateValue('name')}
        className='mt-0'
        onChange={updateStateFromValue('name')}
      />
      <InputMaterial
        type='text'
        name='email'
        label='Email'
        stateRef={getStateValue('email')}
        onChange={updateStateFromValue('email')}
      />
      <InputMaterial
        type='number'
        name='zip'
        label='Zip'
        stateRef={getStateValue('zip')}
        onChange={updateStateFromValue('zip')}
      />
      <InputMaterial
        type='password'
        name='password'
        label='Password'
        stateRef={getStateValue('password')}
        onChange={updateStateFromValue('password')}
      />
      <InputMaterial
        type='password'
        name='passwordConfirm'
        label='Confirm Password'
        stateRef={getStateValue('passwordConfirm')}
        onChange={updateStateFromValue('passwordConfirm')}
      />
    </div>
    <div className='buttons text-align-center'>
      <button
        type='submit'
        className='center display-block ppp-btn btn'
        value='Preview The Petition'
        name='signup_next'
        id='signup_next'
      >
        {type === 'conversational' ? 'Publish' : 'Next'}
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
