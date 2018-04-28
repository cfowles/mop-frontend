/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LoginForm from 'LegacyTheme/login-form'

import { isValidEmail } from '../lib'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      presubmitErrors: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.errorList = this.errorList.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ presubmitErrors: null })
    }
    this.password.value = ''
  }

  /**
   * Validates the form for client side errors.
   * If valid returns true otherwise false.
   * If errors it will update the local state `presubmitErrors`
   * @returns {boolean}
   */
  validateForm() {
    const { email, password } = this
    const errors = []
    if (!isValidEmail(email.value)) {
      if (!this.email.value.trim().length) {
        errors.push({ message: 'Missing required entry for the Email field.' })
      } else {
        errors.push({ message: 'Invalid entry for the Email field.' })
      }
    }
    if (!password.value.trim().length) {
      errors.push({ message: 'Missing required entry for the Password field.' })
    }
    if (errors.length) {
      this.setState({ presubmitErrors: errors })
    }
    return !errors.length
  }

  /**
   * Get the current errors as a jsx array.
   * @returns {Array} an jsx array of errors
   */
  errorList() {
    const errors = this.state.presubmitErrors || this.props.loginErrors || []
    return errors.map((error, idx) => <li key={idx}>{error.message}</li>)
  }

  handleSubmit(event) {
    event.preventDefault()
    if (!this.validateForm()) return
    // Not implemented yet
    const fields = {
      email: this.email.value,
      password: this.password.value
    }
    console.log(fields)
    // this.props.dispatch(sessionActions.login(fields))
  }

  render() {
    return (
      <div className='moveon-petitions'>
        <LoginForm
          errorList={this.errorList}
          handleSubmit={this.handleSubmit}
          setRef={input => input && (this[input.name] = input)}
        />
      </div>
    )
  }
}

Login.propTypes = {
  loginErrors: PropTypes.array,
  dispatch: PropTypes.func,
  isSubmitting: PropTypes.bool
}

function mapStateToProps({ userStore = {} }) {
  return {
    loginErrors: userStore.loginErrors || [],
    isSubmitting: !!userStore.isSubmitting
  }
}

export default connect(mapStateToProps)(Login)
