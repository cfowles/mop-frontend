import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import RegisterForm from 'LegacyTheme/register-form'
import { actions as accountActions } from '../actions/accountActions'

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
    if (nextProps.errors) {
      this.setState({ presubmitErrors: null })
    }
    this.password.value = ''
    this.passwordConfirm.value = ''
  }

  /**
   * Validates the form for client side errors.
   * If valid returns true otherwise false.
   * If errors it will update the local state `presubmitErrors`
   * @returns {boolean}
   */
  validateForm() {
    const { name, email, password, passwordConfirm } = this
    const errors = []
    if (!name.value.trim().length) {
      errors.push({ message: 'Missing required entry for the Name field.' })
    }
    if (!isValidEmail(email.value)) {
      if (!this.email.value.trim().length) {
        errors.push({ message: 'Missing required entry for the Email field.' })
      } else {
        errors.push({ message: 'Invalid entry for the Email field.' })
      }
    }
    if (!password.value.trim().length) {
      errors.push({ message: 'Missing required entry for the Password field.' })
    } else if (password.value.trim() !== passwordConfirm.value.trim()) {
      errors.push({ message: 'Password and PasswordConfirm fields do not match.' })
    }
    if (errors.length) {
      this.setState({ presubmitErrors: errors })
    }
    return !errors.length
  }

  handleSubmit(event) {
    event.preventDefault()
    const { name, email, password, passwordConfirm } = this
    if (this.validateForm()) {
      const fields = {
        [name.name]: name.value,
        [email.name]: email.value,
        [password.name]: password.value,
        [passwordConfirm.name]: passwordConfirm.value
      }
      this.props.dispatch(accountActions.register(fields))
    }
  }

  /**
   * Get the current errors as a jsx array.
   * @returns {Array} an jsx array of errors
   */
  errorList() {
    const errors = this.state.presubmitErrors || this.props.formErrors || []
    return errors.map((error, idx) => <li key={idx}>{error.message}</li>)
  }

  render() {
    return (
      <div className='moveon-petitions'>
        <RegisterForm
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

Register.propTypes = {
  formErrors: PropTypes.array,
  dispatch: PropTypes.func,
  isSubmitting: PropTypes.bool
}

function mapStateToProps({ accountRegisterStore = {} }) {
  return {
    formErrors: accountRegisterStore.formErrors || [],
    isSubmitting: !!accountRegisterStore.isSubmitting
  }
}

export default connect(mapStateToProps)(Register)
