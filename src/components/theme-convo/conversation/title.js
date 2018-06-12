import React from 'react'
import ChatBubble from './chat-bubble'
import { conversation } from './conversation'

const Title = ({
  section,
  currentBubble
}) => (
  <div>
    <ChatBubble currentBubble={currentBubble} bubble={conversation[section][0]} />
    <ChatBubble currentBubble={currentBubble} bubble={conversation[section][1]} />
  </div>
)


export default Title
