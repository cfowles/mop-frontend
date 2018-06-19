import React from 'react'
import PropTypes from 'prop-types'

import { InputMaterial } from 'GiraffeUI/input-material'
import { Submit } from 'GiraffeUI/button'

const RegisterForm = ({ errorList, handleSubmit, setRef, isSubmitting }) => (
  <form onSubmit={handleSubmit}>
    <div className='p-4'>
      <InputMaterial
        name='name'
        placeholder='Name'
        stateRef={setRef}
        className='mt-0'
      />
      <InputMaterial
        type='email'
        name='email'
        placeholder='Email'
        stateRef={setRef}
      />
      <InputMaterial
        type='password'
        name='password'
        placeholder='Password'
        stateRef={setRef}
      />
      <InputMaterial
        type='password'
        name='passwordConfirm'
        placeholder='Confirm Password'
        stateRef={setRef}
      />
    </div>
    <div className='buttons text-align-center'>
      <Submit disabled={isSubmitting}>
        {isSubmitting ? 'Please wait...' : 'Next'}
      </Submit>
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
