import React from 'react'
import PropTypes from 'prop-types'

import { withShareLink } from '../../containers/hoc-share-link'

const RawLink = ({ rawLink }) => (
  <div
    id='hidden_share_link'
    className='lanky-header bump-top-3 align-center hidden'
  >
    Send a link:
    <textarea
      id='link_text'
      defaultValue={rawLink}
      readOnly
    />
  </div>
)

RawLink.propTypes = {
  shareLink: PropTypes.func,
  rawLink: PropTypes.string,
  setLinkRef: PropTypes.func
}

export default withShareLink(RawLink)
