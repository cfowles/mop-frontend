import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import RegisterForm from 'Theme/etc/register-form'
import LoginForm from 'Theme/etc/login-form'

import Config from '../config'
import { register, devLocalRegister } from '../actions/accountActions'
import { appLocation } from '../routes'
import { isValidEmail } from '../lib'

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
    const { name, email, password, passwordConfirm, zip } = this.props;
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
    console.log(event,this);

    const { name, email, password, passwordConfirm, zip, phone } = this.props;
    if (this.validateForm()) {
      const fields = {
        name: name,
        email: email,
        zip: zip,
        password: password,
        passwordConfirm: passwordConfirm
      }

      const { successCallback, dispatch } = this.props;
      dispatch(registerAction(fields, successCallback))
    }
  }

  /* Login Form */
  handleLoginSubmit(event) {
    event.preventDefault()
    console.log(event,this)

    const { email, password } = this.this.props
    if(this.validateLoginForm()){

      const fields = {
        email: this.email.value,
        password: this.password.value
      }

      const { successCallback, dispatch } = this.props
      dispatch(accountActions.login(fields, successCallback))
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
    if(this.state.existingUser){
      return (
        <div className='moveon-petitions'>
          <LoginForm
            errorList={this.errorList}
            handleSubmit={this.handleSubmit}
            // eslint-disable-next-line no-return-assign
            setRef={input => input && (this[input.name] = input)}
            isSubmitting={this.props.isSubmitting}
            email={this.props.email}
            password={this.props.password}
          />
        </div>
      )
    } else {
      return (
        <RegisterForm
          errorList={this.errorList}
          handleSubmit={this.handleSubmit}
          // eslint-disable-next-line no-return-assign
          setRef={input => input && (this[input.name] = input)}
          isSubmitting={this.props.isSubmitting}
          includeZipAndPhone={this.props.includeZipAndPhone}
          useLaunchButton={this.props.useLaunchButton}
          useAlternateFields={this.props.useAlternateFields}
          email={this.props.email}
          zip={this.props.zip}
          name={this.props.name}
          password={this.props.password}
          passwordConfirm={this.props.passwordConfirm}
          updateStateFromValue={this.props.updateStateFromValue}
        />
      )
    }
  }
}

CreateRegister.defaultProps = {
  successCallback: () => appLocation.push('/no_petition.html')
}

CreateRegister.propTypes = {
  formErrors: PropTypes.array,
  dispatch: PropTypes.func,
  isSubmitting: PropTypes.bool,
  includeZipAndPhone: PropTypes.bool,
  useLaunchButton: PropTypes.bool,
  useAlternateFields: PropTypes.bool,
  successCallback: PropTypes.func,
  existingUser: PropTypes.bool
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
