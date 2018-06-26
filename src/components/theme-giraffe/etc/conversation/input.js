import React from 'react'
import PropTypes from 'prop-types'
import ReactTimeout from 'react-timeout'
import { conversation } from './conversation'
import Errors from './errors'
import { InputMaterial } from "GiraffeUI/input-material";

const ConversationalInput = ({
  saveInput,
  updateStateFromValue,
  currentIndex,
  errors,
  title,
  summary,
  description
}) => {

  const inputType = conversation[currentIndex].hasOwnProperty('input') ? conversation[currentIndex].input.type : '';
  const inputPlaceholder = conversation[currentIndex].hasOwnProperty('input') ? conversation[currentIndex].content : '';
  const charLimit = conversation[currentIndex].hasOwnProperty('input') ? conversation[currentIndex].input.charLimit: '';
  
  let stateRef;
  if(inputType === 'title') stateRef = title;
  if(inputType === 'summary') stateRef = summary;
  if(inputType === 'description') stateRef = description;

  const classes =  charLimit > 0 ? 'bg-white user-input has-helper-text' : 'bg-white user-input'

  return (
    <div className='bubble user show'>
      <InputMaterial
        name={inputType}
        type="textarea"
        className={classes}
        placeholder={inputPlaceholder}
        charLimit={charLimit}
        stateRef={stateRef}
        onChange={updateStateFromValue(inputType)}
        onBlur={updateStateFromValue(inputType)}
        id='user-input'
        onKeyPress={event => {
          if (event.key === 'Enter') {
            event.preventDefault();
            const s = saveInput(inputType)
            s();
          }
        }} 
      />
      <a className='bubble-submit' onClick={saveInput(inputType)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </a>
      <Errors
        errors={errors} />
    </div>
  )
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