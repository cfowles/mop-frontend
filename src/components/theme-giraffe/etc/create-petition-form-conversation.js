import React from 'react'
import PropTypes from 'prop-types'

import About from './form/instructions/about'
import StatementTip from './form/instructions/statement'
import TargetCustom from './form/instructions/target-custom'
import TargetNational from './form/instructions/target-national'
import TargetState from './form/instructions/target-state'
import TitleTip from './form/instructions/title'

// import Welcome from './conversation/welcome'
// import Email from './conversation/email'
// import Title from './conversation/title'
// import Statement from './conversation/statement'
// import Background from './conversation/background'
// import ConversationalInput from './conversation/input'
import ChatBubble from './conversation/chat-bubble'
import { conversation } from './conversation/conversation'
import ConversationalInput from './conversation/input'
import Tip from './ppp-steps/tip'
import DesktopProgress from './conversation/desktop-progress'
import CreateTargets from '../../../containers/create-targets'




const instructionsByField = {
  title: <TitleTip />,
  statement: <StatementTip />,
  about: <About />
}

const CreatePetitionFormConversation = ({
  selected,
  setSelected,
  nationalOpen,
  stateOpen,
  customOpen,
  instructionStyle,
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
  email,
  title,
  summary,
  description,
  chatEnd,
  tipModalToggled,
  step,
  errors,
  targets,
  onTargetAdd,
  onTargetRemove,
  customInputs,
  onChangeCustomInputs,
  targetQuery
}) => {
  const instructions = instructionsByField[selected]


  // const welcome = <Welcome section={0} nextSection={nextSection} bubbleShow={bubbleShow} currentBubble={currentBubble} currentIndex={currentIndex} />
  // // const email = section < 1 ? '' : <Email emailOnChange={updateStateFromValue('email')} section={section} nextSection={nextSection} />
  // const title = section < 1 ? '' : <Title section={1} currentBubble={currentBubble} currentIndex={currentIndex} />
  // const summary = section < 2 ? '' : <summary summaryOnChange={updateStateFromValue('summary')} />
  // const description = section < 3 ? '' : <description descriptionOnChange={updateStateFromValue('description')} />

  // let showLoader = bubbleLoading ? 'show' : '';
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
      />
    )
  })

  return (
    <div id='conversational'>
      <div className='chat-wrap'>
        {bubbles}
        <div className={loaderClasses}>
          <div className='inner'>
            <div className='loader'>
              <span className='dot'></span><span className='dot'></span><span className='dot'></span>
            </div>
          </div>
        </div>
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
          currentBubble={currentBubble} />

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
        />
        <div style={{ float: "left", clear: "both" }}
          className="chat-end" >
        </div>
      </div>
      <Tip
        tipModalToggled={tipModalToggled}
        toggleOpen={toggleOpen}
        step={step} />
      <DesktopProgress
        section={section}
      />

    </div>
  )

  // {welcome}
  // {title}
  // {statement}
  // {background}
  // <ConversationalInput section={section} saveInput={saveInput} />
  // <div style={{ float: "left", clear: "both" }}
  //   ref={(el) => { this.chatEnd = el; }}>
  // </div>
  // <div className={loaderClasses}>
  //   <div className='inner'>
  //     <div className='loader'>
  //       <span className='dot'></span><span className='dot'></span><span className='dot'></span>
  //     </div>
  //   </div>
  // </div>
}

CreatePetitionFormConversation.propTypes = {
  selected: PropTypes.string,
  setSelected: PropTypes.func,
  nationalOpen: PropTypes.bool,
  stateOpen: PropTypes.bool,
  customOpen: PropTypes.bool,
  instructionStyle: PropTypes.object,
  setRef: PropTypes.func,
  toggleOpen: PropTypes.func,
  updateStateFromValue: PropTypes.func,
}

export default CreatePetitionFormConversation
