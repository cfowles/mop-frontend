import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LoginForm from 'Theme/login-form'

import { actions as accountActions } from '../actions/accountActions'
import { appLocation } from '../routes'
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
    if (nextProps.formErrors.length) {
      this.setState({ presubmitErrors: null })
      this.password.value = ''
    }
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
    const errors = this.state.presubmitErrors || this.props.formErrors || []
    return errors.map(error => <li key={error.message}>{error.message}</li>)
  }

  handleSubmit(event) {
    event.preventDefault()
    if (!this.validateForm()) return

    const fields = {
      email: this.email.value,
      password: this.password.value
    }
    const { dispatch, location } = this.props

    let successCallback = this.props.successCallback
    if (location.query.redirect) {
      successCallback = () => appLocation.push(location.query.redirect)
    }

    dispatch(accountActions.login(fields, successCallback))
  }

  render() {
    return (
      <div className='moveon-petitions'>
        <LoginForm
          errorList={this.errorList}
          handleSubmit={this.handleSubmit}
          // eslint-disable-next-line no-return-assign
          setRef={input => input && (this[input.name] = input)}
          isSubmitting={this.props.isSubmitting}
        />
      </div>
    )
  }
}

Login.defaultProps = {
  successCallback: () => appLocation.push('/dashboard.html')
}

Login.propTypes = {
  formErrors: PropTypes.array,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  isSubmitting: PropTypes.bool,
  successCallback: PropTypes.func
}

function mapStateToProps({ userStore = {} }) {
  return {
    formErrors: userStore.loginErrors || [],
    isSubmitting: !!userStore.isSubmittingLogin
  }
}

export default connect(mapStateToProps)(Login)
