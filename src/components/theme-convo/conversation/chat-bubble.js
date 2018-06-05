import React from 'react'
import PropTypes from 'prop-types'
import { conversation } from './conversation'
import ReactTimeout from 'react-timeout'

const ChatBubble = ({
    toggleOpen,
    bubbleShow,
    currentBubble,
    bubble
}) => {

    //should 'type' at 40 characters per second => (length / 40) * 1000 for ms.

    const bubbleContent = bubble.content
    const id = bubble.id
    const classes = currentBubble >= id ? 'bubble show' : 'bubble';

    return (
        <div className={classes}>
            <div className="inner">{bubbleContent}</div>
        </div>
    )
}

ChatBubble.propTypes = {
    toggleOpen: PropTypes.func,
    section: PropTypes.number,
}

export default ChatBubble
