import React from 'react'
import PropTypes from 'prop-types'

import { InputBlock } from 'GiraffeUI/input-block'
import { Submit } from 'GiraffeUI/button'

const RegisterForm = ({ errorList, handleSubmit, setRef, isSubmitting }) => (
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
)

RegisterForm.propTypes = {
  errorList: PropTypes.func,
  handleSubmit: PropTypes.func,
  setRef: PropTypes.func,
  isSubmitting: PropTypes.bool
}

export default RegisterForm
