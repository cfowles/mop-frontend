import React from 'react'
import PropTypes from 'prop-types'

import { withShareMessage } from '../../containers/hoc-share-message'
import MailSvg from 'GiraffeUI/svgs/mail.svg'

const MailButton = ({ mailtoMessage, onClick }) => (
  <a className='petition-thanks__cta' href={mailtoMessage} onClick={onClick}>
    <MailSvg />
    Email Petition
  </a>
)

MailButton.propTypes = {
  mailtoMessage: PropTypes.string,
  onClick: PropTypes.func
}

export default withShareMessage(MailButton)
