import React from 'react'
import PropTypes from 'prop-types'

import FlagOutlineSvg from 'GiraffeUI/svgs/flag-outline.svg'
import FlagSolidSvg from 'GiraffeUI/svgs/flag-solid.svg'

import { formatDate } from '../../lib'

const SignatureListItem = ({
  user,
  comments,
  fromLocation,
  date,
  isFlagged,
  onFlag
}) => (
  <div className='signer'>
    <div className='signer__info'>
      <div className='signer__author'>
        {user.name} {fromLocation}
      </div>
      <div className='signer__date'>{formatDate(date)}</div>
    </div>
    {comments && (
      <div className='signer__quote'>
        <p>
          {isFlagged ? 'Thanks for flagging this comment.' : `"${comments}"`}
        </p>
        <button onClick={onFlag} className='signer__flag'>
          {isFlagged ? <FlagSolidSvg /> : <FlagOutlineSvg />}
        </button>
      </div>
    )}
  </div>
)

SignatureListItem.propTypes = {
  user: PropTypes.object,
  number: PropTypes.number,
  fromLocation: PropTypes.string,
  date: PropTypes.object,
  isFlagged: PropTypes.bool,
  onFlag: PropTypes.func,
  comments: PropTypes.string
}

export default SignatureListItem
