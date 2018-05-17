import React from 'react'
import PropTypes from 'prop-types'

import { Message } from 'GiraffeUI/message'

import PetitionFlagForm from '../../containers/petition-flag-form'

export const PetitionMessage = ({ outOfDate, petition: p, isFwd }) => (
  <div className='col-12'>
    <div className='row'>
      {outOfDate && (
        <Message color='orange'>
          This petition has not been edited in a while. As a new legislative
          session has begun, it’s possible some of the targets of this petition
          are out of date.
        </Message>
      )}

      {p.status !== 'Verified' &&
        p.status !== 'Bad' && <PetitionFlagForm petition={p} />}

      {p.status === 'Bad' && (
        <Message color='red'>
          MoveOn volunteers reviewed this petition and determined that it either
          may not reflect MoveOn members&#39; progressive values, or that MoveOn
          members may disagree about whether to support this petition. MoveOn
          will not promote the petition beyond hosting it on our site.{' '}
          <a
            href='https://act.moveon.org/cms/thanks/thanks-your-input'
            target='_blank'
            rel='noopener noreferrer'
          >
            Click here if you think MoveOn should support this petition.
          </a>
        </Message>
      )}

      {p.tags &&
        p.tags.filter(t => t.name === 'outcome:victory').length && (
        <Message color='azure'>
          Victory! The creator of this petition declared the campaign a
          success. You can still sign the petition to show support.
        </Message>
        )}

      {isFwd && (
        <Message color='gray'>
          We&#39;ve forwarded you to this trending petition. To return to your
          previous action, use your browser&#39;s back button.
        </Message>
      )}
    </div>
  </div>
)

PetitionMessage.propTypes = {
  outOfDate: PropTypes.bool,
  petition: PropTypes.object,
  isFwd: PropTypes.bool
}

export default PetitionMessage
