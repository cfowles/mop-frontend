import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import CountrySelect from './form/country-select'
import StateOrRegionInput from './form/state-or-region-input'
import ZipOrPostalInput from './form/zip-or-postal-input'

const SignatureAddForm = ({
  submit,
  petitionBy,
  creator,
  petition,
  user,
  query,
  volunteer,
  onClickVolunteer,
  country,
  onChangeCountry,
  showOptinWarning,
  showOptinCheckbox,
  thirdPartyOptin,
  hiddenOptin,
  showAddressFields,
  requireAddressFields,
  onUnrecognize,
  updateStateFromValue,
  validationError
}) => (
  <div className='span4 widget clearfix' id='sign-here'>
    <div
      className='padding-left-15 form-wrapper background-moveon-light-gray padding-top-1 padding-bottom-1'
      style={{ paddingRight: 15, position: 'relative', top: -10 }}
    >
      <div className='petition-top visible-phone' style={{ paddingLeft: 20 }}>
        <p
          id='to-target'
          className='lh-14 bump-top-1 bump-bottom-1 margin-0 disclaimer'
        >
          Petition statement to be delivered to{' '}
          <span className='all-targets'>
            <strong>{petition.target.map(t => t.name).join(', ')}</strong>
          </span>
        </p>
        <h1 id='petition-title' className='moveon-bright-red big-title'>
          {petition.title}
        </h1>
        <p id='by' className='byline lh-20'>
          Petition by{' '}
          <a
            href={`/contact_creator.html?petition_id=${petition.petition_id}`}
            className='underline'
          >
            {petitionBy}
          </a>
        </p>
      </div>

      <div className='widget-top margin-0 hidden-phone'>
        <h3 className='moveon-bright-red'>Sign this petition</h3>
      </div>

      <form
        name='sign_form'
        id='sign'
        method='post'
        action='.'
        acceptCharset='utf-8'
        onSubmit={submit}
      >
        <input type='hidden' name='petition_id' value={petition.id} />
        <input type='hidden' name='source' value={query.source || ''} />
        <input type='hidden' name='r_by' value={query.r_by || ''} />
        <input type='hidden' name='mailing_id' value={query.mailing_id || ''} />
        <input type='hidden' name='fb_test' value={query.fb_test || '0'} />
        <input type='hidden' name='test_group' value={query.test_group || ''} />
        <input type='hidden' name='no_mo' value={query.no_mo || ''} />
        <input
          type='hidden'
          name='id'
          value={
            user.token && /^id:/.test(user.token) ? user.token.slice(3) : ''
          }
        />
        <input
          type='hidden'
          name='akid'
          value={
            user.token && /^akid:/.test(user.token) ? user.token.slice(5) : ''
          }
        />
        <input
          type='hidden'
          name='recognized_user'
          id='recognized_user_field'
          value={user.signonId ? '1' : '0'}
        />
        <input
          type='hidden'
          name='show_optin_checkbox'
          value={showOptinCheckbox ? '1' : '0'}
        />
        {hiddenOptin ? (
          <span>
            <input type='hidden' name='thirdparty_optin' value='1' />
            <input type='hidden' name='hidden_optin' value='1' />
          </span>
        ) : (
          ''
        )}

        {user.signonId ? (
          // Recognized
          <div id='recognized' style={{ marginBottom: '1em' }}>
            <strong>Welcome back {user.given_name}!</strong>
            <div>
              (Not {user.given_name}? <a onClick={onUnrecognize}>Click here.</a>)
            </div>
          </div>
        ) : (
          // Anonymous
          <div className='unrecognized'>
            <input
              type='text'
              name='name'
              placeholder='Name*'
              className='moveon-track-click'
              onChange={updateStateFromValue('name')}
              onBlur={updateStateFromValue('name')}
            />
            {validationError('name')}
            <input
              type='text'
              name='email'
              placeholder='Email*'
              className='moveon-track-click'
              onChange={updateStateFromValue('email')}
              onBlur={updateStateFromValue('email')}
            />
            {validationError('email')}
          </div>
        )}

        {showAddressFields ? (
          <div>
            <CountrySelect
              value={country}
              onChange={onChangeCountry}
            />
            <input
              type='text'
              name='address1'
              placeholder={requireAddressFields ? 'Address*' : 'Address'}
              onChange={updateStateFromValue('address1')}
              onBlur={updateStateFromValue('address1')}
              className='moveon-track-click'
            />
            {validationError('address1')}
            <input
              type='text'
              name='address2'
              placeholder='Address (cont.)'
              className='moveon-track-click'
              onChange={updateStateFromValue('address2')}
              onBlur={updateStateFromValue('address2')}
            />
            <input
              type='text'
              name='city'
              placeholder={petition.needs_full_addresses ? 'City*' : 'City'}
              onChange={updateStateFromValue('city')}
              onBlur={updateStateFromValue('city')}
              className='moveon-track-click'
            />
            {validationError('city')}
            <StateOrRegionInput
              country={country}
              stateOnChange={updateStateFromValue('state')}
              regionOnChange={updateStateFromValue('region')}
            />
            {validationError('state')}
            <ZipOrPostalInput
              country={country}
              zipOnChange={updateStateFromValue('zip')}
              postalOnChange={updateStateFromValue('postal')}
            />
            {validationError('zip')}
          </div>
        ) : (
          ''
        )}

        <textarea
          className='moveon-track-click'
          rows='3'
          cols='20'
          name='comment'
          autoComplete='off'
          onChange={updateStateFromValue('comment')}
          onBlur={updateStateFromValue('comment')}
          placeholder='Comment'
        />

        {petition.collect_volunteers ? (
          <div>
            <input
              type='checkbox'
              id='volunteer_box'
              name='volunteer'
              value='1'
              onClick={onClickVolunteer}
            />{' '}
            <label htmlFor='volunteer_box' style={{ display: 'inline' }}>
              {petition.collect_volunteers}
            </label>
            {volunteer ? (
              <div id='phone_div'>
                <input
                  type='text'
                  name='phone'
                  placeholder='Phone*'
                  className='phone moveon-track-click'
                  onChange={updateStateFromValue('phone')}
                  onBlur={updateStateFromValue('phone')}
                />
                {validationError('phone')}
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}

        <button
          type='submit'
          className='xl percent-100 moveon-track-click background-moveon-bright-red'
          id='sign-here-button'
          value='Sign the petition!'
          style={{ marginTop: 7.2 }}
          onClick={submit}
        >
          Sign the petition
        </button>

        {showOptinCheckbox ? (
          <div>
            <label
              id='checkbox_label'
              htmlFor='thirdparty_optin'
              className='bump-top-1'
            >
              <input
                type='checkbox'
                id='thirdparty_optin'
                name='thirdparty_optin'
                className='moveon-track-click'
                onChange={updateStateFromValue('thirdparty_optin', /* isCheckbox: */true)}
                defaultChecked={thirdPartyOptin}
              />{' '}
              Receive campaign updates from{' '}
              {creator.organization || 'this organization'}.
            </label>
          </div>
        ) : (
          ''
        )}

        {showOptinWarning ? (
          <p className='disclaimer bump-top-1'>
            <b>Note:</b> This petition is a project of {creator.organization} and
            MoveOn.org. By signing, you agree to receive email messages
            from <span id='organization_receive'>{creator.organization}, </span>MoveOn
            Political Action, and MoveOn Civic Action. You may unsubscribe at
            any time.{' '}
            [<Link to='/privacy.html'>Privacy policy</Link>]
          </p>
        ) : (
          <p className='disclaimer bump-top-1'>
            <b>Note:</b> By signing, you agree to receive email messages from
            MoveOn.org Civic Action and MoveOn.org Political Action. You may
            unsubscribe at any time.{' '}
            [<Link to='/privacy.html'>Privacy policy</Link>]
          </p>
        )}
      </form>
    </div>
    <div className='percent-90 padding-left-15 bump-top-1'>
      <div className='widget-top hidden-phone'>
        <h3 className='moveon-bright-red'>Embed This petition</h3>
      </div>
      <div
        id='embedbox'
        className='codebox percent-95 hidden-phone moveon-track-click'
      >
        {`<iframe src="https://petitions.moveon.org/embed/widget.html?v=3&name=${
          petition.slug
        }" class="moveon-petition" id="petition-embed" width="300px" height="500px"></iframe>`}
      </div>
    </div>
  </div>
)

SignatureAddForm.propTypes = {
  submit: PropTypes.func,
  petition: PropTypes.object.isRequired,
  user: PropTypes.object,
  query: PropTypes.object,
  showAddressFields: PropTypes.bool,
  requireAddressFields: PropTypes.bool,
  petitionBy: PropTypes.string,
  creator: PropTypes.object,
  onUnrecognize: PropTypes.func,
  showOptinWarning: PropTypes.bool,
  showOptinCheckbox: PropTypes.bool,
  thirdPartyOptin: PropTypes.bool,
  hiddenOptin: PropTypes.bool,
  volunteer: PropTypes.bool,
  onClickVolunteer: PropTypes.func,
  country: PropTypes.string,
  onChangeCountry: PropTypes.func,
  updateStateFromValue: PropTypes.func,
  validationError: PropTypes.func
}

export default SignatureAddForm
