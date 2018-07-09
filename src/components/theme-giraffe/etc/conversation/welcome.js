import React from 'react'
import ChatBubble from './chat-bubble'
import { conversation } from './conversation'

const Welcome = ({
  // bubbleShow,
  section,
  // currentBubble,
  currentIndex
}) => {
  const bubbles = conversation[section].map((b, i) => (
    <ChatBubble currentIndex={currentIndex} bubble={b} key={i} />
    ))

  return (
    <div>
      {bubbles}
    </div>
  )
}

export default Welcome
