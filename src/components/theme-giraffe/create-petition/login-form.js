import React from 'react'
import PropTypes from 'prop-types'
import { InputMaterial } from 'GiraffeUI/input-material'

const LoginForm = ({
  errorList,
  handleLoginSubmit,
  updateStateFromValue,
  type,
  getStateValue
}) => (
  <form onSubmit={handleLoginSubmit}>
    <div className='row'>
      <InputMaterial
        type='text'
        name='email'
        label='Email'
        stateRef={getStateValue('email')}
        onChange={updateStateFromValue('email')}
      />
      <InputMaterial
        type='password'
        name='password'
        label='Password'
        stateRef={getStateValue('password')}
        onChange={updateStateFromValue('password')}
      />
    </div>
    <div className='buttons text-align-center'>
      {/* <Submit disabled={isSubmitting}>
              {isSubmitting ? 'Please wait...' : 'Next'}
            </Submit> */}
      <button
        type='button'
        className='center display-block ppp-btn btn'
        value='Preview The Petition'
        name='login_next'
        id='login_next'
        disabled={!getStateValue('email') || !getStateValue('password')}
      >
        {type === 'conversational' ? 'Publish' : 'Next'}
      </button>
      <ul className='mt-3 red errors'>{errorList && errorList()}</ul>
    </div>
  </form>
)

LoginForm.propTypes = {
  errorList: PropTypes.func,
  handleLoginSubmit: PropTypes.func,
  updateStateFromValue: PropTypes.func,
  type: PropTypes.string,
  getStateValue: PropTypes.func
}

export default LoginForm


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
