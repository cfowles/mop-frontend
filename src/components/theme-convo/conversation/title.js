import React from 'react'
import ChatBubble from './chat-bubble'
import { conversation } from './conversation'

const Title = ({
  section,
  currentBubble,
  currentIndex
}) => (
  <div>
    <ChatBubble currentBubble={currentBubble} bubble={conversation[section][0]} currentIndex={currentIndex}/>
    <ChatBubble currentBubble={currentBubble} bubble={conversation[section][1]} currentIndex={currentIndex}/>
  </div>
)


export default Title
