import React from 'react'
import PropTypes from 'prop-types'

import { withCopyLink } from '../../containers/hoc-copy-link'
import LinkSvg from 'GiraffeUI/svgs/link.svg'

const RawLink = ({ rawLink, onClick, copied, clearCopied }) => (
  <a
    href={rawLink}
    onClick={onClick}
    className='mo-btn petition-thanks__link tooltipped tooltipped-up'
    aria-label={copied ? 'Copied to clipboard!' : 'Click to copy link'}
    onMouseOut={clearCopied}
  >
    <LinkSvg />
    Copy Link
  </a>
)

RawLink.propTypes = {
  rawLink: PropTypes.string,
  copied: PropTypes.bool,
  onClick: PropTypes.func,
  clearCopied: PropTypes.func
}

export default withCopyLink(RawLink)
