import React from 'react'
import PropTypes from 'prop-types'

import About from './form/instructions/about'
import StatementTip from './form/instructions/statement'
import TargetCustom from './form/instructions/target-custom'
import TargetNational from './form/instructions/target-national'
import TargetState from './form/instructions/target-state'
import TitleTip from './form/instructions/title'
import Logo from 'GiraffeUI/logo'

import ChatBubble from './conversation/chat-bubble'
import { conversation } from './conversation/conversation'
import ConversationalInput from './conversation/input'
import Tip from './ppp-steps/tip'
import Review from './ppp-steps/review'
import Signup from './ppp-steps/signup'
import DesktopProgress from './conversation/desktop-progress'
import CreateTargets from '../../../containers/create-targets'
import cx from 'classnames'
import '../../../../css/create.css'

const instructionsByField = {
  title: <TitleTip />,
  statement: <StatementTip />,
  about: <About />
}

const CreatePetitionFormConversation = ({
  updateStateFromValue,
  getStateValue,
  toggleOpen,
  editPetition,
  onTargetAdd,
  onTargetRemove,
  onChangeCustomInputs,
  publish,
  targets,
  targetQuery,
  nextSection,
  saveInput,
  toggleEditBubble,
  chatEnd,
  toggleConvoTip
}) => {
  let convoReviewToggled = getStateValue('convoReviewToggled')
  let bubbles = conversation.map(function (b, i) {
    let innerClasses = 'inner';
    let userInput;
    if (b.type === 'input') {
      innerClasses = 'inner user-response'
      if (b.input.type === 'email') userInput = getStateValue('email');
      if (b.input.type === 'title') userInput = getStateValue('title');
      if (b.input.type === 'summary') userInput = getStateValue('summary');
      if (b.input.type === 'description') userInput = getStateValue('description');
      if (b.input.type === 'target') userInput = getStateValue('targets');
    }
    if (b.type === 'tip') innerClasses = 'inner bubble-tip'

    return (
                      <ChatBubble
                        bubble={b}
                        key={i}
                        bubbleId={i}
                        innerClasses={innerClasses}
                        userInput={userInput}
                        toggleOpen={toggleOpen}
                        updateStateFromValue={updateStateFromValue}
                        getStateValue={getStateValue}
                        toggleEditBubble={toggleEditBubble}
                        targets={targets}
                        onTargetRemove={onTargetRemove}/>
    )
  })
  let createTargets = <CreateTargets
                        toggleOpen={toggleOpen}
                        updateStateFromValue={updateStateFromValue}
                        getStateValue={getStateValue}
                        onTargetAdd={onTargetAdd}
                        onTargetRemove={onTargetRemove}
                        onChangeCustomInputs={onChangeCustomInputs}
                        targets={targets}
                        targetQuery={targetQuery}
                        theme="convo"
                        saveInput={saveInput}/>
  let input =         <ConversationalInput
                        saveInput={saveInput}
                        updateStateFromValue={updateStateFromValue}
                        toggleOpen={toggleOpen}
                        getStateValue={getStateValue} />
  let tips =          <Tip
                        toggleOpen={toggleOpen}
                        getStateValue={getStateValue} />
  let review =        <Review
                        toggleOpen={toggleOpen}
                        updateStateFromValue={updateStateFromValue}
                        getStateValue={getStateValue}
                        nextStep={publish}
                        onTargetAdd={onTargetAdd}
                        onTargetRemove={onTargetRemove}
                        onChangeCustomInputs={onChangeCustomInputs}
                        targets={targets}
                        targetQuery={targetQuery}
                        theme='convo' />
  let desktop =       <DesktopProgress
                        getStateValue={getStateValue} />
  let signup =        <Signup
                        // afterSignup={nextStep}
                        getStateValue={getStateValue}
                        toggleOpen={toggleOpen}
                        updateStateFromValue={updateStateFromValue}
                        type='conversational'/>

  return (
    <div>
      <div id='conversational-top'>
        <Logo />
      </div>
      <div id='conversational'>
        <div id='chat-wrap' className={cx('chat-wrap', !convoReviewToggled ? 'toggled' : '')}>
          {bubbles}
          {createTargets}
          {input}
          <div id="chatend" style={{ float: "left", clear: "both", display: getStateValue('currentIndex') > 20  ? "none" : "block" , height: '0', marginTop: getStateValue('currentIndex') === 19 || getStateValue('currentIndex') === 18  ? "210px" : "90px" , background: 'black', width: '100px'}}
            className="chat-end" >
          </div>
        </div>
        {tips}
        <div className={cx("convo-review-wrap", convoReviewToggled ? 'toggled' : '')} >
          {review}
        </div>
        {desktop}
        {signup}
      </div>
    </div>
  )
}

CreatePetitionFormConversation.propTypes = {
  selected: PropTypes.string,
  setSelected: PropTypes.func,
  setRef: PropTypes.func,
  toggleOpen: PropTypes.func,
  updateStateFromValue: PropTypes.func
}

export default CreatePetitionFormConversation
