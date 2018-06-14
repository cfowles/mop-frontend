import React from 'react'
import PropTypes from 'prop-types'

import About from './form/instructions/about'
import StatementTip from './form/instructions/statement'
import TargetCustom from './form/instructions/target-custom'
import TargetNational from './form/instructions/target-national'
import TargetState from './form/instructions/target-state'
import TitleTip from './form/instructions/title'
import CustomTargetSelect from './form/target-select/custom'
import NationalTargetSelect from './form/target-select/national'
import StateTargetSelect from './form/target-select/state'

// import Welcome from './conversation/welcome'
// import Email from './conversation/email'
// import Title from './conversation/title'
// import Statement from './conversation/statement'
// import Background from './conversation/background'
// import ConversationalInput from './conversation/input'
import ChatBubble from './conversation/chat-bubble'
import { conversation } from './conversation/conversation'
import ConversationalInput from './conversation/input'


const instructionsByField = {
  title: <TitleTip />,
  statement: <StatementTip />,
  'target-national': <TargetNational />,
  'target-state': <TargetState />,
  'target-custom': <TargetCustom />,
  about: <About />
}

const CreatePetitionForm = ({
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
  email,
  title,
  statement,
  background,
  chatEnd
}) => {
  const instructions = instructionsByField[selected]

  const national = !nationalOpen ? '' : <NationalTargetSelect />
  const state = !stateOpen ? '' : <StateTargetSelect />
  const custom = !customOpen ? '' : <CustomTargetSelect />

  // const welcome = <Welcome section={0} nextSection={nextSection} bubbleShow={bubbleShow} currentBubble={currentBubble} currentIndex={currentIndex} />
  // // const email = section < 1 ? '' : <Email emailOnChange={updateStateFromValue('email')} section={section} nextSection={nextSection} />
  // const title = section < 1 ? '' : <Title section={1} currentBubble={currentBubble} currentIndex={currentIndex} />
  // const statement = section < 2 ? '' : <Statement statementOnChange={updateStateFromValue('statement')} />
  // const background = section < 3 ? '' : <Background backgroundOnChange={updateStateFromValue('background')} />

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
          case 'statement':
            userInput = statement;
            break;
          case 'background':
            userInput = background;
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
        <ConversationalInput section={section} saveInput={saveInput} updateStateFromValue={updateStateFromValue} currentIndex={currentIndex} />
        <div style={{ float: "left", clear: "both" }}
          className="chat-end" >
        </div>
      </div>
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

CreatePetitionForm.propTypes = {
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

export default CreatePetitionForm
