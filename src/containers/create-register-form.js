import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Config from '../config'
import { register, devLocalRegister, login } from '../actions/accountActions'
import { isValidEmail } from '../lib'
import LoginForm from 'GiraffeTheme/create-petition/login-form'
import RegisterForm from 'GiraffeTheme/create-petition/register-form'

class CreateRegister extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      presubmitErrors: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.validateLoginForm = this.validateLoginForm.bind(this)
    this.errorList = this.errorList.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.formErrors.length) {
      this.setState({ presubmitErrors: null })
      this.password.value = ''
      this.passwordConfirm.value = ''
    }
  }

  /**
   * Validates the form for client side errors.
   * If valid returns true otherwise false.
   * If errors it will update the local state `presubmitErrors`
   * @returns {boolean}
   */
  validateForm() {
    const { name, email, password, passwordConfirm, zip } = this.props
    const errors = []
    if (!name.length) {
      errors.push({ message: 'Missing required entry for the Name field.' })
    }
    if (!isValidEmail(email)) {
      if (!email.length) {
        errors.push({ message: 'Missing required entry for the Email field.' })
      } else {
        errors.push({ message: 'Invalid entry for the Email field.' })
      }
    }
    if (!password.length) {
      errors.push({ message: 'Missing required entry for the Password field.' })
    } else if (password !== passwordConfirm) {
      errors.push({
        message: 'Password and PasswordConfirm fields do not match.'
      })
    }
    if (!zip.length) {
      errors.push({ message: 'Missing required entry for the ZIP Code field.' })
    }
    if (errors.length) {
      this.setState({ presubmitErrors: errors })
    }
    return !errors.length
  }

  validateLoginForm() {
    const { email, password } = this.props
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

  handleSubmit(event) {
    event.preventDefault()
    const registerAction = Config.API_WRITABLE ? register : devLocalRegister

    const { name, email, password, passwordConfirm, zip } = this.props
    if (this.validateForm()) {
      const fields = {
        name,
        email,
        zip,
        password,
        passwordConfirm
      }

      const { successCallback, isCreatingPetition, dispatch } = this.props
      dispatch(registerAction(fields, { successCallback, isCreatingPetition }))
    }
  }

  /* Login Form */
  handleLoginSubmit(event) {
    event.preventDefault()

    // const { email, password } = this.props
    if (this.validateLoginForm()) {
      const fields = {
        email: this.email.value,
        password: this.password.value
      }
      const { dispatch } = this.props
      const successCallback = this.props.successCallback(true)
      dispatch(login(fields, successCallback))
    }
  }

  /**
   * Get the current errors as a jsx array.
   * @returns {Array} an jsx array of errors
   */
  errorList() {
    const errors = this.state.presubmitErrors || this.props.formErrors || []
    return errors.map(error => <li key={error.message}>{error.message}</li>)
  }

  render() {
    if (this.props.loginToggled) {
      return (
        <div className='moveon-petitions'>
          <LoginForm
            errorList={this.errorList}
            handleSubmit={this.handleSubmit}
            updateStateFromValue={this.props.updateStateFromValue}
            type={this.props.type}
            getStateValue={this.props.getStateValue}
          />
        </div>
      )
    }
      return (
        <RegisterForm
          errorList={this.errorList}
          handleSubmit={this.handleSubmit}
          updateStateFromValue={this.props.updateStateFromValue}
          type={this.props.type}
          getStateValue={this.props.getStateValue}
        />
      )
  }
}

CreateRegister.defaultProps = {
  isCreatingPetition: false
}

CreateRegister.propTypes = {
  formErrors: PropTypes.array,
  dispatch: PropTypes.func,
  successCallback: PropTypes.func,
  isCreatingPetition: PropTypes.bool,
  loginToggled: PropTypes.bool,
  updateStateFromValue: PropTypes.func,
  type: PropTypes.string,
  getStateValue: PropTypes.func,
  name: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  email: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  password: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  passwordConfirm: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  zip: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ])
}

function mapStateToProps({ userStore = {}, petitionCreateStore = {} }) {
  return {
    formErrors: userStore.registerErrors || [],
    isSubmitting: Boolean(
      userStore.isSubmittingRegister || petitionCreateStore.isSubmitting
    )
  }
}

export default connect(mapStateToProps)(CreateRegister)
