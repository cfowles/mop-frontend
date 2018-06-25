import React from 'react'
import PropTypes from 'prop-types'
import { conversation } from './conversation'
import ReactTimeout from 'react-timeout'

import EditSvg from '../../../../giraffe-ui/svgs/edit.svg'
import LightbulbSvg from '../../../../giraffe-ui/svgs/lightbulb.svg'

const ChatBubble = ({
    currentIndex,
    bubble,
    bubbleId,
    innerClasses,
    userInput,
    toggleOpen,
    tipModalToggled
}) => {

    const staticBubble = (
        <div className={innerClasses}>{bubble.content}</div>
    )
    const tip = (
        <span onClick={toggleOpen("tipModalToggled", bubble.tipID)}><LightbulbSvg /></span>
    );
    const edit = (
        <span>
            <EditSvg />
        </span>
    );
    const interactBubble = (
        <div className={innerClasses}>
            {bubble.type === 'input' ? userInput : bubble.content}
            {bubble.type === 'input' ? edit : tip}
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
