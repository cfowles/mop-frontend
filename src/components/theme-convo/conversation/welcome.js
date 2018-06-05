import React from 'react'
import ChatBubble from './chat-bubble'
import { conversation } from './conversation'

const Welcome = ({
  bubbleShow,
  section,
  currentBubble
}) => {

  // let showBubble = bubbleShow ? 'show' : '';
  // let bubbleClasses = 'bubble ' + showBubble;
  // let bubbles = conversation[section].map(function (b, i) {
  //   return (
  //     <ChatBubble currentBubble={currentBubble} bubble={b} key={i}/>
  //   )
  // })

  return (
    <div>
      <ChatBubble currentBubble={currentBubble} bubble={conversation[section][0]} />
      <ChatBubble currentBubble={currentBubble} bubble={conversation[section][1]} />
      <ChatBubble currentBubble={currentBubble} bubble={conversation[section][2]} />
    </div>
  )
}

export default Welcome
