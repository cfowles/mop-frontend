import React from 'react'
import PropTypes from 'prop-types'

import { Message } from 'GiraffeUI/message'

export const ThanksNextPetition = ({ secondsLeft, onCancel }) => (
  <Message color='gray' action={<a onClick={onCancel}>cancel</a>}>
    We’ve found another petition which may interest you. We’ll forward you there
    in {secondsLeft} seconds.
  </Message>
)

ThanksNextPetition.propTypes = {
  secondsLeft: PropTypes.number,
  onCancel: PropTypes.func
}
