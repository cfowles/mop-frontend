import React from 'react'
import PropTypes from 'prop-types'
import { Portal } from 'react-portal'

import PetitionFlagForm from '../../containers/petition-flag-form'

const hasTag = (tag, petition) =>
  Boolean(petition.tags && petition.tags.filter(t => t.name === tag).length)

export const PetitionMessage = ({ petition: p, isFwd }) => (
  <Portal node={document && document.getElementById('message-portal')}>
    <div>
      {hasTag('possibly_out_of_date', p) ? (
        <div className='message-header'>
          <span className='bell'>
            This petition has not been edited in a while. As a new legislative
            session has begun, it’s possible some of the targets of this petition
            are out of date.
          </span>
        </div>
      ) : (
        ''
      )}

      {(p.status !== 'Verified' && p.status !== 'Bad') ? (
        <div className='message-header'>
          <PetitionFlagForm petition={p} />
        </div>
      ) : (
        ''
      )}

      {p.status === 'Bad' ? (
        <div className='message-header'>
          <span className='bell'>
            MoveOn volunteers reviewed this petition and determined that it either
            may not reflect MoveOn members&#39; progressive values, or that MoveOn
            members may disagree about whether to support this petition. MoveOn
            will not promote the petition beyond hosting it on our site.{' '}
            <a
              href='https://act.moveon.org/cms/thanks/thanks-your-input'
              target='_blank'
              rel='noopener noreferrer'
            >
              Click here
            </a>{' '}
            if you think MoveOn should support this petition.
          </span>
        </div>
      ) : (
        ''
      )}

      {hasTag('outcome:victory', p) ? (
        <div className='message-header'>
          <img alt='star icon' src='/images/star.png' height='30' width='30' />
          <span>
            <strong>Victory!</strong> The creator of this petition declared the
            campaign a success. You can still sign the petition to show support.
          </span>
        </div>
      ) : (
        ''
      )}

      {isFwd ? (
        <div className='message-header'>
          <span className='bell'>
            We&#39;ve forwarded you to this trending petition. To return to your
            previous action, use your browser&#39;s back button.
          </span>
        </div>
      ) : (
        ''
      )}
    </div>
  </Portal>
)

PetitionMessage.propTypes = {
  petition: PropTypes.object,
  isFwd: PropTypes.bool
}

export default PetitionMessage
