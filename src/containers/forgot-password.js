import React from 'react'

import ForgotPasswordForm from 'LegacyTheme/forgot-password-form'
import { actions as accountActions } from '../actions/accountActions'

import { isValidEmail } from '../lib'

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      presubmitErrors: [],
      submitted: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.errorList = this.errorList.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  /**
   * Validates the form for client side errors.
   * If valid returns true otherwise false.
   * If errors it will update the local state `presubmitErrors`
   * @returns {boolean}
   */
  validateForm() {
    const errors = []
    if (!isValidEmail(this.email.value)) {
      if (!this.email.value.trim().length) {
        errors.push({ message: 'Missing required entry for the Email field.' })
      } else {
        errors.push({ message: 'Invalid entry for the Email field.' })
      }
    }
    if (errors.length) {
      this.setState({ presubmitErrors: errors })
    }
    return !errors.length
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.validateForm()) {
      accountActions.forgotPassword(this.email.value).then(() => {
        this.setState({ submitted: true })
      })
    }
  }

  /**
   * Get the current errors as a jsx array.
   * @returns {Array} an jsx array of errors
   */
  errorList() {
    return this.state.presubmitErrors.map(error => (
      <li key={error.message}>{error.message}</li>
    ))
  }

  render() {
    return (
      <div className='moveon-petitions'>
        <ForgotPasswordForm
          handleSubmit={this.handleSubmit}
          submitted={this.state.submitted}
          errorList={this.errorList}
          getEmailRef={input => {
            this.email = input
          }}
        />
      </div>
    )
  }
}

export default ForgotPassword
