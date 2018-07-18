import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import RegisterForm from 'Theme/register-form'
import RegisterFormMaterial from '../components/theme-giraffe/create-petition/register-form'

import Config from '../config'
import { register, devLocalRegister } from '../actions/accountActions'
import { appLocation } from '../routes'
import { isValidEmail } from '../lib'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      presubmitErrors: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validateForm = this.validateForm.bind(this)
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
    const material = this.props.useMaterialDesign
    const { name, email, password, passwordConfirm, zip } = material ? this.props : this
    const errors = []
    if (material ? !name.length : !name.value.trim().length) {
      errors.push({ message: 'Missing required entry for the Name field.' })
    }
    if (!isValidEmail(material ? email : email.value)) {
      if (material ? !email.length : !this.email.value.trim().length) {
        errors.push({ message: 'Missing required entry for the Email field.' })
      } else {
        errors.push({ message: 'Invalid entry for the Email field.' })
      }
    }
    if (material ? !password.length : !password.value.trim().length) {
      errors.push({ message: 'Missing required entry for the Password field.' })
    } else if (material ? (password !== passwordConfirm) : (password.value.trim() !== passwordConfirm.value.trim())) {
      errors.push({
        message: 'Password and PasswordConfirm fields do not match.'
      })
    }
    if (material ? !zip.length : (this.props.includeZipAndPhone && !zip.value.trim().length)) {
      errors.push({ message: 'Missing required entry for the ZIP Code field.' })
    }
    if (errors.length) {
      this.setState({ presubmitErrors: errors })
    }
    return !errors.length
  }

  handleSubmit(event) {
    event.preventDefault()
    const material = this.props.useMaterialDesign
    const registerAction = Config.API_WRITABLE ? register : devLocalRegister
    const { name, email, password, passwordConfirm, zip, phone } = material ? this.props : this
    if (this.validateForm()) {
      let fields
      if (material) {
        fields = {
          name,
          email,
          zip,
          password,
          passwordConfirm
        }
      } else {
        fields = {
          [name.name]: name.value,
          [email.name]: email.value,
          [password.name]: password.value,
          [passwordConfirm.name]: passwordConfirm.value
        }
        if (this.props.includeZipAndPhone) {
          fields[zip.name] = zip.value
          fields[phone.name] = phone.value
        }
      }

      const { successCallback, isCreatingPetition, dispatch } = this.props
      dispatch(registerAction(fields, { successCallback, isCreatingPetition }))
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
    if (this.props.useMaterialDesign) {
      return (
        <RegisterFormMaterial
          errorList={this.errorList}
          handleSubmit={this.handleSubmit}
          updateStateFromValue={this.props.updateStateFromValue}
          type={this.props.type}
          getStateValue={this.props.getStateValue}
          isSubmitting={this.props.isSubmitting}
        />
      )
    }
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
      />
    )
  }
}

Register.defaultProps = {
  successCallback: () => appLocation.push('/no_petition.html'),
  isCreatingPetition: false
}

Register.propTypes = {
  formErrors: PropTypes.array,
  dispatch: PropTypes.func,
  isSubmitting: PropTypes.bool,
  includeZipAndPhone: PropTypes.bool,
  useLaunchButton: PropTypes.bool,
  useAlternateFields: PropTypes.bool,
  successCallback: PropTypes.func,
  isCreatingPetition: PropTypes.bool,
  useMaterialDesign: PropTypes.bool,
  updateStateFromValue: PropTypes.func,
  type: PropTypes.string,
  getStateValue: PropTypes.func
}

function mapStateToProps({ userStore = {}, petitionCreateStore = {} }) {
  return {
    formErrors: userStore.registerErrors || [],
    isSubmitting: Boolean(
      userStore.isSubmittingRegister || petitionCreateStore.isSubmitting
    )
  }
}

export default connect(mapStateToProps)(Register)
