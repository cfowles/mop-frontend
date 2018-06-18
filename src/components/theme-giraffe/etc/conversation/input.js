import React from 'react'
import PropTypes from 'prop-types'
import ReactTimeout from 'react-timeout'
import {conversation} from './conversation'

const ConversationalInput = ({
    saveInput,
    updateStateFromValue,
    currentIndex
}) => {

    const inputType = conversation[currentIndex].hasOwnProperty('input') ? conversation[currentIndex].input.type : '' ;
    return (
      <div className='bubble user show'>
        <input
          className='user-input'
          type='text'
          name={inputType}
          placeholder=''
          onChange={updateStateFromValue(inputType)}
          onBlur={updateStateFromValue(inputType)} />
        <a className='bubble-submit' onClick={saveInput}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </a>
      </div>
    )
}

ConversationalInput.propTypes = {
    toggleOpen: PropTypes.func,
    updateStateFromValue: PropTypes.func,
    section: PropTypes.number,
}

export default ConversationalInput
