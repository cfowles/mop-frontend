import React from 'react'
import PropTypes from 'prop-types'
import ReactTimeout from 'react-timeout'
import { conversation } from './conversation'
import Errors from './errors'
import { InputMaterial } from "GiraffeUI/input-material";
import cx from 'classnames'

const ConversationalInput = ({
  saveInput,
  updateStateFromValue,
  currentIndex,
  errors,
  title,
  summary,
  description,
  email,
  targetQuery,
  toggleOpen,
  bubbleLoading,
  getStateValue
}) => {

  let inputType = conversation[currentIndex].hasOwnProperty('input') ? conversation[currentIndex].input.type : '';
  const inputPlaceholder = conversation[currentIndex].hasOwnProperty('input') ? conversation[currentIndex].content : '';
  const charLimit = conversation[currentIndex].hasOwnProperty('input') ? conversation[currentIndex].input.charLimit : '';

  let stateRef;
  if (inputType === 'email') stateRef = email;
  if (inputType === 'title') stateRef = title;
  if (inputType === 'summary') stateRef = summary;
  if (inputType === 'description') stateRef = description;
  if (inputType === 'target') {
    stateRef = targetQuery;
    inputType = 'targetQuery'
  }

  const classes = charLimit > 0 ? 'bg-white user-input has-helper-text' : 'bg-white user-input'

  if (inputType === 'review') {
    return (
      <div className='bubble user show review-btn-wrap'>
        <button className='convo-review-btn bg-azure white' onClick={toggleOpen('convoReviewToggled')}>Review</button>
      </div>
    )
  } else {
    return (
      <div className='user-bubble-wrap'>
        <div className={cx("bubble loader-wrap", bubbleLoading ? 'show' : '')}>
          <div className='inner'>
            <div className='loader'>
              <span className='dot'></span><span className='dot'></span><span className='dot'></span>
            </div>
          </div>
        </div>
        <div className='bubble user show'>
          <InputMaterial
            name={inputType}
            type="textarea"
            className={classes}
            label={inputPlaceholder}
            placeholder={inputPlaceholder}
            charLimit={charLimit}
            stateRef={stateRef}
            onChange={updateStateFromValue(inputType)}
            onBlur={updateStateFromValue(inputType)}
            id='user-input'
            onKeyPress={event => {
              if (event.key === 'Enter' && getStateValue(inputType)) {
                event.preventDefault();
                const s = saveInput(inputType)
                s();
              }
            }}
          />
        <button className='bubble-submit' disabled={!getStateValue(inputType)} onClick={saveInput(inputType)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </button>
          <Errors
            errors={errors} />
        </div>
      </div>
    )
  }
}

ConversationalInput.propTypes = {
  toggleOpen: PropTypes.func,
  updateStateFromValue: PropTypes.func,
  section: PropTypes.number,
}

export default ConversationalInput


// <input
// id='user-input'
// className='user-input'
// type='type'
// name={inputType}
// placeholder={inputPlaceholder}
// onChange={updateStateFromValue(inputType)}
// onBlur={updateStateFromValue(inputType)}
// onKeyPress={event => {
//   if (event.key === 'Enter') {
//     saveInput(inputType)
//   }
// }}
// />
