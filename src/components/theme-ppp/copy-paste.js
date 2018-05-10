import React from 'react'
import PropTypes from 'prop-types'

import { withShareMessage } from '../../containers/hoc-share-message'

const CopyPaste = ({ onClick, copyPasteMessage }) => (
  <textarea
    className='petition-thanks__text'
    id='email-textarea'
    onClick={e => {
      e.target.select()
      onClick(e)
    }}
    value={copyPasteMessage}
    readOnly
  />
)

CopyPaste.propTypes = {
  onClick: PropTypes.func,
  copyPasteMessage: PropTypes.string
}

export default withShareMessage(CopyPaste)
