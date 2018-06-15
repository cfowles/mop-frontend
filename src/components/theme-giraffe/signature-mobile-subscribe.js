import React from 'react'
import PropTypes from 'prop-types'
import { InputBlock } from 'GiraffeUI/input-block'
import { Link } from 'react-router'

const MobileSubscribe = ({ updateOptIn, updatePhoneNo, showBox }) => (
  <div>
    <InputBlock
      name='phone'
      label='Mobile'
      onChange={updatePhoneNo}
      placeholder='555-555-5555'
    />
    { showBox ?
      <div className='mobileoptincheckbox'>
        <InputBlock
          type='checkbox'
          onChange={updateOptIn}
          name='mobile_optin'
          label='Receive mobile alerts from MoveOn. Msg & data rates may apply. Text STOP to 668366 to stop receiving messages. Text HELP to 668366 for more information.'
        />
        <Link className='mobileoptinlink' to='https://front.moveon.org/moveon-sms-terms-conditions/' style={{ marginLeft: '30px' }}> Terms & Conditions. </Link>
      </div>
    : '' }
  </div>
)

MobileSubscribe.propTypes = {
  updateOptIn: PropTypes.func,
  updatePhoneNo: PropTypes.func,
  showBox: PropTypes.bool
}

export default MobileSubscribe
