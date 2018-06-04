import React from 'react'
import PropTypes from 'prop-types'
import { conversation } from './conversation'

const ChatBubble = ({
    toggleOpen,
    section
}) => {

    const currentSection = conversation[section]
    console.log(currentSection)

    //should 'type' at 40 characters per second => (length / 40) * 1000 for ms.

    const bubbles = currentSection.bubbles.map(function(b, i){
      return (
        <div className='bubble' key={i}>{b.content}</div>
      )
    })

    return (
        <div>
          {bubbles}
        </div>
    )
}

ChatBubble.propTypes = {
    toggleOpen: PropTypes.func,
    step: PropTypes.number,
}

export default ChatBubble
