import React from 'react'
import PropTypes from 'prop-types'
import { conversation } from './conversation'
import ReactTimeout from 'react-timeout'

const ChatBubble = ({
    currentIndex,
    bubble,
    bubbleId,
    innerClasses,
    userInput
}) => {
    // const inputButton = (
    //     <svg>
    //         {React.createElement('use', {href:"#edit", "xlinkHref": "#edit"})}
    //     </svg>
    // )
    // {bubble.type === 'input' ? inputButton : 'i' }
    const staticBubble = (
        <div className={innerClasses}>{bubble.content}</div>
    )
    const interactBubble = (
        <div className={innerClasses}>
            {bubble.type === 'input' ? userInput : bubble.content}
            <span></span>
        </div>
    )
    const bubbleOutput = bubble.type === 'input' || bubble.type === 'tip' ? interactBubble : staticBubble;
    const classes = currentIndex >= (bubbleId + 1) ? 'bubble show' : 'bubble';

    return (
        <div className={classes}>
            {bubbleOutput}
        </div>
    )
}

ChatBubble.propTypes = {
    toggleOpen: PropTypes.func,
    section: PropTypes.number,
}

export default ChatBubble
