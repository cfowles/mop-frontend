import React from 'react'
import PropTypes from 'prop-types'

import About from './form/instructions/about'
import StatementTip from './form/instructions/statement'
import TargetCustom from './form/instructions/target-custom'
import TargetNational from './form/instructions/target-national'
import TargetState from './form/instructions/target-state'
import TitleTip from './form/instructions/title'

import ChatBubble from './conversation/chat-bubble'
import { conversation } from './conversation/conversation'
import ConversationalInput from './conversation/input'
import Tip from './ppp-steps/tip'
import Review from './ppp-steps/review'
import Signup from './ppp-steps/signup'
import DesktopProgress from './conversation/desktop-progress'
import CreateTargets from '../../../containers/create-targets'
import cx from 'classnames'
import '../../../../css/convo.css'

const instructionsByField = {
  title: <TitleTip />,
  statement: <StatementTip />,
  about: <About />
}

const CreatePetitionFormConversation = ({
  selected,
  setSelected,
  setRef,
  toggleOpen,
  updateStateFromValue,
  section,
  nextSection,
  saveInput,
  currentBubble,
  currentIndex,
  bubbleShow,
  bubbleLoading,
  bubbleEdit,
  editBubble,
  saveEditBubble,
  user,
  email,
  title,
  summary,
  description,
  chatEnd,
  tipModalToggled,
  signupModalToggled,
  step,
  errors,
  targets,
  onTargetAdd,
  onTargetRemove,
  customInputs,
  onChangeCustomInputs,
  targetQuery,
  convoReviewToggled,
  editPetition,
  publish,
  theme,
  zip,
  name,
  password,
  passwordConfirm,
  loginToggled,
  getStateValue
}) => {
  const instructions = instructionsByField[selected]

  let loaderClasses = bubbleLoading ? 'bubble show loader-wrap' : 'bubble loader-wrap';
  let bubbles = conversation.map(function (b, i) {
    let innerClasses;
    let userInput;
    switch (b.type) {
      case 'input':
        innerClasses = 'inner user-response';
        switch (b.input.type) {
          case 'email':
            userInput = email;
            break;
          case 'title':
            userInput = title;
            break;
          case 'summary':
            userInput = summary;
            break;
          case 'description':
            userInput = description;
            break;
          case 'target':
            userInput = targets;
            break;
        }
        break;
      case 'tip':
        innerClasses = 'inner bubble-tip';
        break;
      default:
        innerClasses = 'inner';
        break;
    }
    return (
      <ChatBubble
        currentIndex={currentIndex}
        bubble={b}
        key={i}
        bubbleId={i}
        innerClasses={innerClasses}
        userInput={userInput}
        toggleOpen={toggleOpen}

        section={section}
        saveInput={saveInput}
        updateStateFromValue={updateStateFromValue}
        currentIndex={currentIndex}
        errors={errors}
        title={title}
        summary={summary}
        description={description}
        email={email}
        bubbleEdit={bubbleEdit}
        editBubble={editBubble}
        saveEditBubble={saveEditBubble}
        targets={targets}
        onTargetRemove={onTargetRemove}
      />
    )
  })

  return (
    <div id='conversational'>
      <div className={cx('chat-wrap', !convoReviewToggled ? 'toggled' : '' )}>
        {bubbles}
        <CreateTargets
          updateStateFromValue={updateStateFromValue}

          setSelected={setSelected}
          setRef={setRef}
          targets={targets}
          onTargetAdd={onTargetAdd}
          onTargetRemove={onTargetRemove}
          customInputs={customInputs}
          onChangeCustomInputs={onChangeCustomInputs}
          targetQuery={targetQuery}
          theme="convo"
          section={section}
          currentIndex={currentIndex}
          saveInput={saveInput} />

        <ConversationalInput
          section={section}
          saveInput={saveInput}
          updateStateFromValue={updateStateFromValue}
          currentIndex={currentIndex}
          errors={errors}
          title={title}
          summary={summary}
          description={description}
          email={email}
          targetQuery={targetQuery}
          toggleOpen={toggleOpen}
          bubbleLoading={bubbleLoading}
          getStateValue={getStateValue}
        />
        <div id="chatend" style={{ float: "left", clear: "both", display: "block", height: "100px", marginTop: targetQuery.length ? "150px" : "50px" }}
          className="chat-end" >
        </div>
      </div>
      <Tip
        tipModalToggled={tipModalToggled}
        toggleOpen={toggleOpen}
        step={step} />
      <div className={cx("convo-review-wrap", convoReviewToggled ? 'toggled' : '')} >
        <Review
          tipModalToggled={tipModalToggled}
          toggleOpen={toggleOpen}
          editPetition={editPetition}
          title={title}
          summary={summary}
          description={description}
          updateStateFromValue={updateStateFromValue}
          step={step}
          nextStep={toggleOpen('signupModalToggled')}

          setSelected={setSelected}
          setRef={setRef}
          targets={targets}
          onTargetAdd={onTargetAdd}
          onTargetRemove={onTargetRemove}
          customInputs={customInputs}
          onChangeCustomInputs={onChangeCustomInputs}
          targetQuery={targetQuery}
          theme='convo'
          />
      </div>
      <DesktopProgress
        section={section}
      />
      <Signup
                                user={user}
                                afterSignup={publish}
                                step={step}
                                signupModalToggled={signupModalToggled}
                                toggleOpen={toggleOpen}
                                updateStateFromValue={updateStateFromValue}
                                name={name}
                                email={email}
                                zip={zip}
                                password={password}
                                passwordConfirm={passwordConfirm}
                                loginToggled={loginToggled}
                                type={'conversational'}
                                />
    </div>
  )
}

CreatePetitionFormConversation.propTypes = {
  selected: PropTypes.string,
  setSelected: PropTypes.func,
  setRef: PropTypes.func,
  toggleOpen: PropTypes.func,
  updateStateFromValue: PropTypes.func,
}

export default CreatePetitionFormConversation
