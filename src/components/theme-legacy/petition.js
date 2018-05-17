/* eslint-disable react/jsx-closing-tag-location, jsx-a11y/alt-text */
import React from 'react'
import PropTypes from 'prop-types'

import { text2paraJsx } from '../../lib'
import SignatureAddForm from '../../containers/signature-add-form'
import SignatureCount from 'LegacyTheme/signature-count'
import SignatureList from '../../containers/signature-list'
import PetitionMessage from 'LegacyTheme/petition-message'
import { Link } from 'react-router'

const Petition = ({ petition: p, query, petitionBy, outOfDate, adminLink }) => (
  <div className='container'>
    <PetitionMessage petition={p} outOfDate={outOfDate} isFwd={query.fwd} />
    <div className='row'>
      <SignatureAddForm petition={p} query={query} />

      <div className='span8 pull-right petition-info-top'>
        <div className='percent-95 padding-left-15 form-wrapper responsive padding-bottom-1 padding-left-2 padding-right-3' style={{ marginLeft: '-20px', position: 'relative' }}>
          {adminLink && (
            <a style={{ float: 'right' }} href={adminLink}>
              zoom &#x270e;
            </a>
          )}
          <div className='petition-top hidden-phone'>
            <h1 id='petition-title' className='moveon-bright-red big-title'>{p.title}</h1>
            <p id='by' className='byline lh-20'>
              Petition by <a href={`/contact_creator.html?petition_id=${p.petition_id}`} className='underline'>
                {petitionBy}
              </a>
            </p>
            <p id='to-target' className='lh-14 bump-top-1 bump-bottom-1 margin-0 disclaimer'>To be delivered to <span className='all-targets'><strong>
              {p.target.map(t => t.name).join(', ')}</strong></span></p>
          </div>
          <div id='pet-statement-box' className='lh-36 blockquote'>
            <h3 className='visible-phone moveon-bright-red'>Petition Statement</h3>
            <div id='pet-statement'>{text2paraJsx(p.summary)}</div>
          </div>

          <SignatureCount current={p.total_signatures} goal={p.signature_goal} />
        </div>

        <div className='clear' />

        <div id='pet-explain' className='background-moveon-white bump-top-1 padding-left-2' style={{ marginLeft: '-20px' }}>
          <div className='widget'>
            <div className='widget-top'>
              <h3 className='moveon-bright-red padding-bottom-1'>Petition Background</h3>
            </div>
            {p.featured_image_url ? (
              <img id='pet-image' src={p.featured_image_url} role='presentation' />
            ) : ''}
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: p.description }} />
          </div>

          <div className='widget hidden-phone'>
            <div className='widget-top'>
              <h3 className='moveon-bright-red padding-bottom-1'>Current petition signers</h3>
            </div>

            <SignatureList
              petition={p}
              signatureCount={p.total_signatures}
            />

            <div>
              <div id='pet-signers' className='bump-top-1' />
              <form id='flag-comment-form' action='/flag_comment.html' method='POST'>
                <input id='flag-comment-user-id' type='hidden' name='user_id' value='' />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='row'>
      <div className='span12'>
        <div id='privacy'>
          <p className='disclaimer bump-top-2'>
            <strong>Note</strong>: MoveOn {p.entity === 'c4' ? 'Civic' : 'Political'} Action does not necessarily endorse the contents of petitions posted on this site. MoveOn Petitions is an open tool that anyone can use to post a petition advocating any point of view, so long as the petition does not violate our <Link to='/terms.html'>terms of service</Link>.
          </p>
        </div>
      </div>
    </div>
  </div>
)


Petition.propTypes = {
  petition: PropTypes.object.isRequired,
  query: PropTypes.object,
  petitionBy: PropTypes.string,
  outOfDate: PropTypes.string,
  adminLink: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
}

export default Petition
