import React from 'react'
import PropTypes from 'prop-types'

import { ThanksNextPetition as ThanksNextPetitionComponent } from 'Theme/thanks-next-petition'

import { appLocation } from '../routes'

/* A nice description of how/when this works from the Platform Team:
   You have to click on a share link and have that open in another tab.
   A countdown begins only once you click back into the thanks page tab.
   It tells you it's going to redirect in x seconds and gives you a link to cancel.
   If you click the link to cancel, then you stay on the page.
   If not, you go to the new petition, with the source code share_chain.
   If you click on another share link, the process will repeat.
*/

class ThanksNextPetition extends React.Component {
  constructor(props) {
    super(props)
    this.startSeconds = 10
    this.state = {
      cancelled: false,
      secondsLeft: this.startSeconds + 1,
      intervalListener: null
    }
    this.startCountdown = this.startCountdown.bind(this)
    this.tickCounter = this.tickCounter.bind(this)
  }

  componentWillMount() {
    // Start countdown on refocusing to this window
    window.addEventListener('focus', this.startCountdown)
  }

  startCountdown() {
    window.removeEventListener('focus', this.startCountdown)
    // Guard against running twice -- countdown should be a singleton
    if (this.state.secondsLeft > this.startSeconds) {
      if (this.state.intervalListener) {
        clearInterval(this.state.intervalListener)
      }
      this.setState({ intervalListener: setInterval(this.tickCounter, 1000) })
    }
  }

  tickCounter() {
    if (this.state.cancelled) {
      if (this.state.intervalListener) {
        clearInterval(this.state.intervalListener)
        this.setState({
          intervalListener: null,
          secondsLeft: this.startSeconds + 1
        })
      }
      return
    }
    const newSecondsLeft = this.state.secondsLeft - 1
    this.setState({ secondsLeft: newSecondsLeft })
    if (newSecondsLeft <= 0) {
      this.redirectToNext()
    }
  }

  nextUrl() {
    const { nextPetition } = this.props
    return nextPetition ? `/sign/${nextPetition.name}?source=share_chain` : ''
  }

  redirectToNext() {
    if (this.state.intervalListener) {
      clearInterval(this.state.intervalListener)
      this.setState({ intervalListener: null })
    }
    const nextUrl = this.nextUrl()
    if (nextUrl) {
      appLocation.push(nextUrl)
    }
  }

  render() {
    if (!this.props.nextPetition || this.state.cancelled) {
      return null
    }
    return (
      <ThanksNextPetitionComponent
        secondsLeft={this.state.secondsLeft}
        onCancel={() => this.setState({ cancelled: true })}
      />
    )
  }
}

ThanksNextPetition.propTypes = {
  nextPetition: PropTypes.object
}

export default ThanksNextPetition
