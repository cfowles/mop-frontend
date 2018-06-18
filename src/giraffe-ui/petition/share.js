import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import MailSvg from '../svgs/mail.svg'
import FacebookSvg from '../svgs/facebook.svg'
import TwitterSvg from '../svgs/twitter.svg'
import LinkSvg from '../svgs/link.svg'
import cx from 'classnames'

export const Share = ({ className, hasLabels, children }) => {
  const el = hasLabels ? 'share__item' : 'share-icon'
  const elementCn = `${className}__${el}`
  return (
    <div className={`${className}__share`}>
      <strong className={`${className}__share-heading`}>Share</strong>
      <div className={`${className}__share${hasLabels ? '__links' : '-icons'}`}>
        {React.Children.map(children, child =>
          // Cloning each child is the only way to apply props that were passed into the parent
          React.cloneElement(child, { hasLabels, elementCn })
        )}
      </div>
    </div>
  )
}

Share.propTypes = {
  hasLabels: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node
}

const childPropTypes = {
  onClick: PropTypes.func,
  hasLabels: PropTypes.bool,
  elementCn: PropTypes.string
}

const Mail = ({ onClick, hasLabels, elementCn }) => (
  <Link onClick={onClick} className={cx(elementCn, `${elementCn}--mail`)}>
    <MailSvg />
    {hasLabels && 'Email'}
  </Link>
)
Mail.propTypes = childPropTypes
Share.Mail = Mail

const Facebook = ({ onClick, hasLabels, elementCn }) => (
  <Link onClick={onClick} className={elementCn}>
    <FacebookSvg />
    {hasLabels && 'Facebook'}
  </Link>
)
Facebook.propTypes = childPropTypes
Share.Facebook = Facebook

const Twitter = ({ onClick, hasLabels, elementCn }) => (
  <Link onClick={onClick} className={elementCn}>
    <TwitterSvg />
    {hasLabels && 'Twitter'}
  </Link>
)
Twitter.propTypes = childPropTypes
Share.Twitter = Twitter

const CopyLink = ({ onClick, hasLabels, elementCn, className, ...rest }) => (
  <Link onClick={onClick} className={cx(elementCn, className)} {...rest}>
    <LinkSvg />
    {hasLabels && 'Copy Link'}
  </Link>
)
CopyLink.propTypes = {
  ...childPropTypes,
  className: PropTypes.string
}
Share.CopyLink = CopyLink
