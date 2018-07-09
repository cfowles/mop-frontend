import React from 'react'
import PropTypes from 'prop-types'
import { conversation } from './conversation'
import ReactTimeout from 'react-timeout'
import Edit from '../../../../giraffe-ui/svgs/edit.svg'
import Check from '../../../../giraffe-ui/svgs/check.svg'
import Lightbulb from '../../../../giraffe-ui/svgs/lightbulb.svg'
import CloseIcon from '../../../../giraffe-ui/svgs/close.svg'
import { InputMaterial } from 'GiraffeUI/input-material'
import ConversationalInput from './input'
import cx from 'classnames'

const ChatBubble = ({
    bubble,
    bubbleId,
    innerClasses,
    userInput,
    toggleOpen,
    updateStateFromValue,
    getStateValue,
    toggleEditBubble,
    targets,
    onTargetRemove
}) => {
    const inputType = bubble.hasOwnProperty('input') ? bubble.input.type : ''
    const inputPlaceholder = bubble.hasOwnProperty('input') ? bubble.content : ''
    const charLimit = bubble.hasOwnProperty('input') ? bubble.input.charLimit : ''

    const staticBubble = (
      <div className={innerClasses}>{bubble.content}</div>
    )

    let targetBubbles = []
    if (inputType === 'target') {
        if (!targets.length) return null
        targetBubbles = targets.map((target, i) => (
          <div className={innerClasses} key={i}>
            {target.label}
            <span className='close bubble-fab bg-azure' onClick={onTargetRemove(target)}>
              <CloseIcon />
            </span>
          </div>
            ))
    }

    let interactBubble = null

    if (getStateValue('bubbleEdit') === inputType) {
        interactBubble = (
          <div className={cx(innerClasses, 'editing')}>
            <InputMaterial
              name={inputType}
              type='textarea'
              className={cx('bg-white user-input', charLimit > 0 ? 'has-helper-text' : '')}
              label={inputPlaceholder}
              charLimit={charLimit}
              stateRef={userInput}
              onChange={updateStateFromValue(inputType)}
              onBlur={updateStateFromValue(inputType)}
              id='user-input'
              value={userInput}
              onKeyPress={event => {
                        if (event.key === 'Enter') {
                            event.preventDefault()
                            const s = toggleEditBubble(inputType)
                            s()
                        }
                    }}
            />
            <a className='bubble-submit' onClick={toggleEditBubble(inputType)}>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                <path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' />
                <path d='M0 0h24v24H0z' fill='none' />
              </svg>
            </a>
          </div>
        )
    } else if (inputType === 'target') {
            interactBubble = (
              <div>
                {targetBubbles}
              </div>
            )
        } else {
            interactBubble = (
              <div className={innerClasses}>
                {bubble.type === 'input' ? userInput : bubble.content}
                {bubble.type === 'input' ? <span onClick={toggleEditBubble(inputType)} className='bubble-fab'><Edit /></span> : <span onClick={toggleOpen('tipModalToggled', bubble.tipID)} className='bubble-fab'><Lightbulb /></span>}
              </div>
            )
        }
    const bubbleOutput = bubble.type === 'input' || bubble.type === 'tip' ? interactBubble : staticBubble
    const classes = getStateValue('currentIndex') >= (bubbleId + 1) || (inputType === 'target') ? 'bubble show' : 'bubble'

    return (
      <div className={classes}>
        {bubbleOutput}
      </div>
    )
}

ChatBubble.propTypes = {
    toggleOpen: PropTypes.func
}

export default ChatBubble
