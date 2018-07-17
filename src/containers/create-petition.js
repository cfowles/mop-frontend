import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

// import { appLocation } from '../routes'

import Config from '../config'

import { previewSubmit, submit, devLocalSubmit } from '../actions/createPetitionActions'
import { conversation } from 'GiraffeUI/conversation/conversation'

import CreatePetitionForm from 'GiraffeTheme/create-petition/create-petition-form'
import CreatePetitionFormConversation from 'GiraffeTheme/create-petition/create-petition-form-conversation'

import { isValidEmail } from '../lib'

const CONVO_ERRORS = {
  empty: {
    email: 'Please provide your email.',
    title: 'Please provide a title for your petition.',
    summary: 'Please fill in the statement for your petition.',
    target: 'You must select at least one target for your petition.',
    description: 'Please provide background info for your petition.'
  },
  maxChar: {
    title: 50,
    summary: 100,
    description: 500
  }
}
let CHAT_END

class CreatePetition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // User Data
      name: false,
      email: false,
      country: false,
      zip: false,
      password: false,
      passwordConfirm: false,
      nearby_count: false,
      // Petition Data
      title: false,
      summary: false,
      target: false,
      description: false,
      targetQuery: '',
      customInputs: { name: '', email: '', title: '' },
      errors: [],
      // Flow control
      step: 1,
      section: 0,
      sectionLengths: [],
      currentBubble: 0,
      currentIndex: 0,
      bubbleShow: false,
      bubbleLoading: false,
      bubbleEdit: false,
      // Toggles
      signupModalToggled: false,
      tipModalToggled: false,
      shareButtonsToggled: false,
      editPetition: false,
      convoReviewToggled: false,
      loginToggled: false
    }
    this.nextStep = this.nextStep.bind(this)
    this.getSectionLengths = this.getSectionLengths.bind(this)
    this.callSection = this.callSection.bind(this)
    this.nextSection = this.nextSection.bind(this)
    this.callBubble = this.callBubble.bind(this)
    this.nextBubble = this.nextBubble.bind(this)
    this.saveInput = this.saveInput.bind(this)
    this.toggleEditBubble = this.toggleEditBubble.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
    this.scrollToTop = this.scrollToTop.bind(this)
    this.updateStateFromValue = this.updateStateFromValue.bind(this)
    this.getStateValue = this.getStateValue.bind(this)
    this.toggleOpen = this.toggleOpen.bind(this)
    this.onTargetAdd = this.onTargetAdd.bind(this)
    this.onTargetRemove = this.onTargetRemove.bind(this)
    this.submitPetition = this.submitPetition.bind(this)
    this.validateAndContinue = this.validateAndContinue.bind(this)
  }

  componentDidMount() {
    const uinput = document.getElementById('user-input')
    CHAT_END = document.getElementById('chatend')
    if (uinput) {
      uinput.focus()
    }

    this.getSectionLengths()
    this.initSection = setTimeout(() => {
      this.callSection()
    }, 500)
  }


    // --------------------
    // TARGETS
    // --------------------
    onTargetAdd(target, { isCustom } = { isCustom: false }) {
      return () => {
        if (!isCustom && !target.label) return // target is invalid
        if (this.state.target) {
          if (!isCustom && this.state.target.find(old => old.label === target.label)) return // already exists
        }
        if (isCustom && !this.state.targetQuery) return // Trying to add a blank custom target
        if (isCustom) {
          this.setState({ customInputs: { name: '', email: '', title: '' } })
        }
        this.setState({ target: [...this.state.target, target], targetQuery: '' })
        // Reset and focus on target search bar
        const tquery = document.getElementById('target-query')
        const rquery = document.getElementById('review-target-query')
        if (tquery) {
          tquery.value = ''
          tquery.focus()
        }
        if (rquery) {
          rquery.value = ''
          rquery.focus()
        }
        this.scrollToBottom()
      }
    }

    onTargetRemove(target) {
      return () => {
        this.setState(state => ({
          target: state.target.filter(e => e.label !== target.label)
        }))
      }
    }

  // --------------------
  // SHARED
  // --------------------
  getSectionLengths() { // Get the length of each section in the conversation script to control how many bubbles are displayed before the user is given an input prompt
    const sections = []
    const sectionLengths = []
    let count = 0
    conversation.forEach(el => {
      if (Object.prototype.hasOwnProperty.call(el, 'section')) sections.push(el.section)
    })
    for (let i = 0; i < sections[sections.length - 1]; i += 1) {
      /* eslint-disable no-loop-func */
      sections.forEach(el => {
        if (el === i) count += 1
      })
      sectionLengths.push(count)
      count = 0
    }
    this.setState(prevState => {
      const newState = prevState.sectionLengths.concat(sectionLengths)
      return { sectionLengths: newState }
    })
  }

  getStateValue(field) {
    // some check? Need to return undefined right now.
    // if (this.state[field])
    return this.state[field]
  }

  updateStateFromValue(field, isCheckbox = false) {
    return event => {
      const value = isCheckbox ? event.target.checked : event.target.value
      this.setState({
        [field]: value
      })
    }
  }

  toggleOpen(element, id = 0) {
    return () => {
      if (id) this.setState({ step: id })
      this.setState(prevState => {
        const prev = prevState[element]
        return { [element]: !prev }
      })
    }
  }

  // --------------------
  // PPP
  // --------------------
  nextStep() {
    if (this.state.step === 1) {
      if (this.state.zip && !this.state.nearby_count) {
        const url = `${Config.API_URI}/targets/zip?zip=${this.state.zip}`

        fetch(url).then(
          response => response.json()).then(data => {
            if (data.nearby_count > 10) this.setState({ nearby_count: data.nearby_count })
          })
      }
    }
    this.scrollToTop()
    this.setState(prevState => {
      const newStep = prevState.step + 1
      return { step: newStep, signupModalToggled: false }
    })
  }

  // --------------------
  // CONVERSATION
  // --------------------
  nextSection() {
    this.setState(prevState => {
      const newSection = prevState.section + 1
      return { section: newSection }
    })
  }

  callSection() {
    const sectionLength = this.state.sectionLengths[this.state.section]
    this.setState({ bubbleLoading: true })
    this.callBubble(sectionLength)
  }

  callBubble(sectionLength) {
    const bubbleLength = conversation[this.state.currentIndex].content.length
    const bubbleTime = (bubbleLength / 60) * 1000
    this.bubbleTimeout = setTimeout(() => {
      this.nextBubble()
      if (this.state.currentBubble < sectionLength) {
        this.callBubble(sectionLength)
      } else {
        this.setState({ bubbleLoading: false, currentBubble: 0 })
      }
    }, bubbleTime)
  }

  nextBubble() {
    setTimeout(() => this.scrollToBottom(), 600)
    this.setState(prevState => {
      const newBubble = prevState.currentBubble + 1
      const newIndex = prevState.currentIndex + 1
      return { currentBubble: newBubble, currentIndex: newIndex }
    })
  }

  saveInput(inputType) {
    const uinput = document.getElementById('user-input')
    const tquery = document.getElementById('target-query')
    return () => {
      this.setState({ errors: [] })
      if (!this.convoInputIsValid(inputType)) return
      this.nextBubble()
      this.setState({ currentBubble: 0 })
      uinput.value = ''
      tquery.value = ''
      if (this.state.section === 3) {
        setTimeout(() => tquery.focus(), 1000)
      } else {
        uinput.focus()
      }
      this.inputTimeout = setTimeout(() => {
        this.nextSection()
        this.callSection()
      }, 500)
    }
  }

  toggleEditBubble(inputType) {
    if (!this.state.bubbleEdit) return () => this.setState({ bubbleEdit: inputType }) // Toggle bubble editing on
    return () => { // Validate and toggle bubble editing off
      this.setState({ errors: [] })
      if (!this.convoInputIsValid(inputType)) return
      this.setState({ bubbleEdit: false })
    }
  }

  /* eslint-disable class-methods-use-this */
  scrollToBottom() {
    // browser bug {behavior: "smooth",block: "end"}
    if (CHAT_END) CHAT_END.scrollIntoView()
  }

  scrollToTop() {
    window.scrollTo(0, 0)
  }


  // --------------------
  // VALIDATION
  // --------------------
  validateAndContinue() {
    if (this.formIsValid()) {
      this.props.dispatch(
        previewSubmit({
          title: this.state.title,
          summary: this.state.summary,
          target: this.state.target,
          description: this.state.description,
          source: this.state.source,
          clonedFromId: this.state.clonedFromId,
          solicitId: this.state.solicitId
        })
      )
      this.submitPetition()
    }
  }

  formIsValid() {
    const { title, summary, target, description } = this.state
    const errors = []
    if (!title) errors.push(CONVO_ERRORS.name)
    if (!summary) errors.push(CONVO_ERRORS.text_statement)
    if (!target) errors.push(CONVO_ERRORS.target)
    if (!description) errors.push(CONVO_ERRORS.text_about)
    if (errors.length) {
      this.setState({ errors })
      return false
    }
    return true
  }

  convoInputIsValid(inputType) {
    const errors = []
    if (!this.state[inputType]) errors.push(CONVO_ERRORS.empty[inputType])
    if (Object.prototype.hasOwnProperty.call(CONVO_ERRORS.maxChar, inputType)) {
      if (this.state[inputType].length > CONVO_ERRORS.maxChar[inputType]) errors.push(`Please use ${CONVO_ERRORS.maxChar[inputType]} characters or less in your ${inputType}`)
    }
    if (inputType === 'email' && this.state.email) {
      if (!isValidEmail(this.state.email)) errors.push('Please use a valid email address.')
    }
    if (errors.length) {
      this.setState({ errors })
      return false
    }
    return true
  }

  // SUBMIT
  submitPetition() {
    return this.props.dispatch(Config.API_WRITABLE ? submit(this.state.zip) : devLocalSubmit())
  }


  render() {
    // const createType = !this.props.params.type ? 'p' : this.props.params.type
    let createType

    if (this.props.params) {
      createType = Object.prototype.hasOwnProperty.call(this.props.params, 'type') ? this.props.params.type : 'p'
    } else {
      createType = 'p'
    }

    if (createType === 'p') {
      return (
        <div className='moveon-petitions'>
          <CreatePetitionForm
            updateStateFromValue={this.updateStateFromValue}
            getStateValue={this.getStateValue}
            nextStep={this.nextStep}
            toggleOpen={this.toggleOpen}
            editPetition={this.state.editPetition}
            onTargetAdd={this.onTargetAdd}
            onTargetRemove={this.onTargetRemove}
            publish={this.validateAndContinue}
            targets={this.state.target}
            targetQuery={this.state.targetQuery}
            step={this.state.step}
          />
        </div>
      )
    }
      return (
        <div className='moveon-petitions'>
          <CreatePetitionFormConversation
            updateStateFromValue={this.updateStateFromValue}
            getStateValue={this.getStateValue}
            toggleOpen={this.toggleOpen}
            nextSection={this.nextSection}
            toggleConvoTip={this.toggleConvoTip}
            toggleEditBubble={this.toggleEditBubble}
            saveInput={this.saveInput}
            chatEnd={this.state.chatEnd}
            onTargetAdd={this.onTargetAdd}
            onTargetRemove={this.onTargetRemove}
            publish={this.validateAndContinue}
            targetQuery={this.state.targetQuery}
            targets={this.state.target}
          />
        </div>
      )
  }
}

CreatePetition.propTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.object
}

export default withRouter(connect()(CreatePetition))
