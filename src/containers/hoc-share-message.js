import React from 'react'
import PropTypes from 'prop-types'

function generateMailMessage(
  about,
  statement,
  isCreator,
  shareOpts,
  fullTarget,
  petitionLink
) {
  if (shareOpts.email_share) {
    return shareOpts.email_share
  }
  const actedOn = isCreator ? 'created' : 'signed'
  const target =
    fullTarget
      .slice(0, 3)
      .map(t => t.name)
      .join(' and ') +
    (fullTarget.length > 3 ? `, and ${fullTarget.length} others` : '')
  const tooLong = 600 // 2024 for the whole message, so how about 600 for each
  const petitionAbout = about.length < tooLong ? `\n${about}` : ''
  const petitionStatement = statement.length < tooLong ? `"${statement}"\n` : ''
  return `Hi,
${petitionAbout}
${petitionAbout ? '\nThat‘s why ' : ''}I ${actedOn} a petition to ${target}${
  petitionStatement ? ', which says:\n' : '.'
}
${petitionStatement}
Will you sign this petition? Click here:

${petitionLink}

Thanks!
`
}

export function withShareMessage(WrappedComponent) {
  class ShareMessage extends React.Component {
    getLink() {
      const { petition, prefix, suffix, trackingParams } = this.props
      let url = `${petition._links.url}?source=${prefix}.em`

      url = `${url}.__TYPE__`

      if (suffix) url = `${url}.${suffix}`

      if (trackingParams) url = `${url}&${trackingParams}`

      return url
    }

    render() {
      const {
        /* eslint-disable no-unused-vars */
        // remove props we don't want to pass through
        petition,
        isCreator,
        prefix,
        suffix,
        trackingParams,
        recordShare,
        ...otherProps
      } = this.props
      /* eslint-enable */
      const shareOpts =
        (petition.share_options && petition.share_options[0]) || {}

      // Convert description to text
      const textDescription = document.createElement('div')
      textDescription.innerHTML = petition.description

      const message = generateMailMessage(
        textDescription.textContent,
        petition.summary,
        isCreator,
        shareOpts,
        petition.target,
        this.getLink()
      )

      const mailtoMessage = `mailto:?subject=${encodeURIComponent(
        petition.title
      )}&body=${encodeURIComponent(message.replace('__TYPE__', 'mt'))}`

      const copyPasteMessage = `Subject: ${petition.title}\n\n${message.replace(
        '__TYPE__',
        'cp'
      )}`

      return (
        <WrappedComponent
          {...otherProps}
          mailtoMessage={mailtoMessage}
          copyPasteMessage={copyPasteMessage}
          onClick={recordShare}
        />
      )
    }
  }

  ShareMessage.propTypes = {
    petition: PropTypes.object,
    isCreator: PropTypes.bool,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    trackingParams: PropTypes.string,
    recordShare: PropTypes.func
  }

  return ShareMessage
}
