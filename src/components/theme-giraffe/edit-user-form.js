import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const inputStyle = {
  height: '17px',
  marginBottom: '5px',
  width: '95%'
}

const EditUserForm = ({ user, handleSubmit, zip, onChangeZip, isSubmitting }) => (
  <form onSubmit={handleSubmit}>
    {user.no_zip && (
      <input
        value={zip}
        onChange={onChangeZip}
        name='zip'
        type='text'
        placeholder='Zip'
        style={inputStyle}
        required
      />
    )}
    <button
      type='submit'
      className='xl percent-100 bump-top-3 background-moveon-bright-red'
      id='sign-here-button'
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Please wait...' : 'Launch petition'}
    </button>
  </form>
)

EditUserForm.propTypes = {
  handleSubmit: PropTypes.func,
  user: PropTypes.object,
  zip: PropTypes.string,
  onChangeZip: PropTypes.func,
  isSubmitting: PropTypes.bool
}

function mapStateToProps({ petitionCreateStore = {} }) {
  return {
    isSubmitting: petitionCreateStore.isSubmitting
  }
}

export default connect(mapStateToProps)(EditUserForm)
