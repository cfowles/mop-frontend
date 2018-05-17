import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'

import { Message } from 'GiraffeUI/message'

export const PetitionFlag = ({
  reasonsArray,
  isOpen,
  setOpen,
  setClosed,
  flagged,
  submitFlag
}) => {
  const reasons = reasonsArray.map(([reason, description]) => (
    <span key={reason}>
      <a onClick={() => submitFlag(reason)}>
        {description}
      </a>
      {', '}
    </span>
  ))

  return flagged ? (
    <Message color='orange'>
      <p>Thanks for flagging this petition.</p>
      <p>
        If any petition receives enough flags from different users, we’ll review
        it and remove it from the site if it violates our policies.
      </p>
      <Link to='/'>Return to home page</Link>
    </Message>
  ) : (
    <Message color='orange' action={<a onClick={setOpen}>flag the petition</a>}>
      MoveOn has not yet reviewed this petition. If you agree with it, please
      sign it!
      {isOpen && (
        <div>
          <span>Choose reason for flagging: </span>
          {reasons}
          <a onClick={setClosed}>
            nevermind
          </a>
        </div>
      )}
    </Message>
  )
}

PetitionFlag.propTypes = {
  reasonsArray: PropTypes.array,
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
  setClosed: PropTypes.func,
  flagged: PropTypes.bool,
  submitFlag: PropTypes.func
}

export default PetitionFlag
