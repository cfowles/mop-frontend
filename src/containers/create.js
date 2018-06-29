import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { appLocation } from '../routes'

import Config from '../config'

import { previewSubmit, submit, devLocalSubmit, loadTargets } from '../actions/createPetitionActions'
import ReactTimeout from 'react-timeout'
import { conversation } from 'Theme/etc/conversation/conversation'

import CreatePetitionForm from 'Theme/etc/create-petition-form'
import CreatePetitionFormConversation from 'Theme/etc/create-petition-form-conversation'

import { isValidEmail } from '../lib'

const ERRORS = {
  name: 'Please provide a title for your petition.',
  text_statement: 'Please fill in the statement for your petition.',
  target: 'You must select at least one target for your petition.',
  text_about: 'Please provide background info for your petition.',
  email: 'Invalid entry for the Email field.'
}
const CONVO_ERRORS = {
  empty: {
    email: 'Please provide your email.',
    title: 'Please provide a title for your petition.',
    summary: 'Please fill in the statement for your petition.',
    target: 'You must select at least one target for your petition.',
    description: 'Please provide background info for your petition.',
  },
  maxChar: {
    title: 50,
    summary: 100,
    description: 500
  }
}
var CHAT_END;

class CreatePetition extends React.Component {
  constructor(props) {
    super(props)
    const { initialPetition, location } = this.props
    const query = (location && location.query) || {}
    this.state = {
      errors: [],
      selected: 'title',
      customInputs: { name: '', email: '', title: '' },

      // nationalOpen: false,
      // stateOpen: false,
      // customOpen: false,

      /*** PPP ***/
      step: 4,

      // User Data
      user: {},
      name: false,
      email: false,
      country: false,
      zip: false,
      password: false,
      passwordConfirm: false,

      // Toggles
      signupModalToggled: false,
      tipModalToggled: false,
      shareButtonsToggled: false,
      editPetition: false,
      convoReviewToggled: false,

      // Petition Data
      title: false,
      summary: false,
      target: false,
      description: false,
      //title: false,
      //summary: false,
      //description: false,
      selectedTargets: [],
      targetQuery: '',

      /*** Convo ***/
      section: 0,
      sectionLengths: [],

      // Bubbles
      currentBubble: 0,
      currentIndex: 0,
      bubbleShow: false,
      bubbleLoading: false,
      bubbleEdit: false
    }
    this.setSelected = this.setSelected.bind(this)
    this.setRef = this.setRef.bind(this)
    this.toggleOpen = this.toggleOpen.bind(this)
    // this.toggleConvoTip = this.toggleConvoTip.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.updateStateFromValue = this.updateStateFromValue.bind(this)
    this.nextSection = this.nextSection.bind(this)
    this.callSection = this.callSection.bind(this)
    this.callBubble = this.callBubble.bind(this)
    this.nextBubble = this.nextBubble.bind(this)
    this.saveInput = this.saveInput.bind(this)
    this.getSectionLengths = this.getSectionLengths.bind(this)
    this.validateAndContinue = this.validateAndContinue.bind(this)
    this.submitPetition = this.submitPetition.bind(this)
    this.onTargetAdd = this.onTargetAdd.bind(this)
    this.onTargetRemove = this.onTargetRemove.bind(this)
    this.editBubble = this.editBubble.bind(this)
    this.saveEditBubble = this.saveEditBubble.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }

  componentDidMount() {
    var uinput = document.getElementById('user-input');
    CHAT_END = document.getElementById('chatend');
    if (uinput) {
      uinput.focus();
    }

    this.getSectionLengths();
    this.initSection = setTimeout(function () {
      this.callSection();
    }.bind(this), 500)
  }


  // Conversation
  getSectionLengths() {
    let sections = [];
    let sectionLengths = [];
    let count = 0;
    conversation.map(function (el) {
      if (el.hasOwnProperty('section')) {
        sections.push(el.section);
      }
    });
    for (let i = 0; i < sections[sections.length - 1]; i++) {
      sections.map(function (el, ind) {
        if (el === i) {
          count++
        }
      })
      sectionLengths.push(count);
      count = 0;
    }
    this.setState(prevState => {
      const prev = prevState.sectionLengths;
      const newState = prev.concat(sectionLengths);
      return { sectionLengths: newState }
    })
  }

  callSection() {
    let sectionLength = this.state.sectionLengths[this.state.section];
    this.setState({ bubbleLoading: true });
    this.callBubble(sectionLength);
  }

  callBubble(sectionLength) {
    let bubbleLength = conversation[this.state.currentIndex].content.length
    let bubbleTime = (bubbleLength / 60) * 1000;

    this.bubbleTimeout = setTimeout(() => {
      this.nextBubble();

      if (this.state.currentBubble < sectionLength) {
        this.callBubble(sectionLength);
      } else {
        this.setState({ bubbleLoading: false });
        this.setState({ currentBubble: 0 });
      }
    }, bubbleTime)
  }

  saveInput(inputType) {
    return () => {
      this.setState({ errors: [] });
      if (!this.convoInputIsValid(inputType)) return;

      this.nextBubble();
      this.setState({ currentBubble: 0 });
      document.getElementById("user-input").value = "";
      if(this.state.section === 3) {
        setTimeout(()=>{
          document.getElementById("target-query").focus()
        },1000)
      } else  {
        document.getElementById("user-input").focus();
      }

      this.inputTimeout = setTimeout(function () {
        this.nextSection();
        this.callSection();
      }.bind(this), 500)
    }
  }

  nextSection() {
    this.setState(prevState => {
      let newSection = prevState.section + 1;
      return { section: newSection }
    })
  }

  nextBubble() {
    this.scrollToBottom()
    if(this.state.currentIndex === 19) setTimeout(()=>this.scrollToBottom(), 500)
    this.setState(prevState => {
      const newBubble = prevState.currentBubble + 1;
      const newIndex = prevState.currentIndex + 1;
      return { currentBubble: newBubble, currentIndex: newIndex }
    })
  }

  editBubble(inputType) {
    return () => this.setState({bubbleEdit: inputType})
  }

  saveEditBubble(inputType) {
    return () => {
      this.setState({ errors: [] });
      if (!this.convoInputIsValid(inputType)) return;
      this.setState({bubbleEdit: false})
    }
  }

  // conversational scrolling
  scrollToBottom() {
    if(CHAT_END)
      CHAT_END.scrollIntoView({behavior: "smooth"});
  }

  // PPP
  toggleOpen(element, id = 0) {
    return () => {
      console.log(element)
      if (id) this.setState({ step: id });
      this.setState(prevState => {
        const prev = prevState[element]
        return { [element]: !prev }
      })
    }
  }

  nextStep() {
    this.setState(prevState => {
      let newStep = prevState.step + 1;
      return { step: newStep, signupModalToggled: false }
    })
  }



  // Shared
  updateStateFromValue(field, isCheckbox = false) {
    return (event) => {
      const value = isCheckbox ? event.target.checked : event.target.value
      this.setState({
        [field]: value
      })
    }
  }

  // Targets
  onTargetAdd(
    target,
    { isCustom, callback } = { isCustom: false, callback: () => { } }
  ) {
    return () => {
      if (!isCustom && !target.label) return // target is invalid
      if (this.state.target){
        if (!isCustom && this.state.target.find(old => old.label === target.label)) return // already exists
      }

      if (isCustom && !this.state.targetQuery) return // Trying to add a blank custom target

      if (isCustom) {
        this.setState({ customInputs: { name: '', email: '', title: '' } }) 
      }

      this.setState({ target: [...this.state.target, target], targetQuery: ''})

      // Reset and focus on target search bar
      let tquery = document.getElementById('target-query')
      if(tquery) {
        tquery.value = ""
        tquery.focus();
      }
      let rquery = document.getElementById('review-target-query')
      if(rquery) {
        rquery.value = ""
        rquery.focus();
      }
      this.scrollToBottom();
    }
  }

  onTargetRemove(target) {
    return () => {
      this.setState(state => ({
        target: state.target.filter(e => e.label !== target.label)
      }))
    }
  }

  setSelected(name) {
    return () => this.setState({ selected: name })
  }

  setRef(name) {
    // eslint-disable-next-line no-return-assign
    return input => input && (this[name] = input)
  }


  // Submit

  submitPetition() {
    return this.props.dispatch(Config.API_WRITABLE ? submit(this.state.zip) : devLocalSubmit())
  }


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
    if (!title) errors.push(ERRORS.name)
    if (!summary) errors.push(ERRORS.text_statement)
    //if (!target.length) errors.push(ERRORS.target)
    if (!description) errors.push(ERRORS.text_about)
    if (errors.length) {
      console.error(errors);
      this.setState({ errors })
      return false
    }

    return true
  }

  convoInputIsValid(inputType) {
    let errors = [];
    let errorKey;


    if (!this.state[inputType]) errors.push(CONVO_ERRORS.empty[inputType]);
    if (CONVO_ERRORS.maxChar.hasOwnProperty(inputType)) {
      if (this.state[inputType].length > CONVO_ERRORS.maxChar[inputType]) errors.push('Please use ' + CONVO_ERRORS.maxChar[inputType] + ' characters or less in your ' + inputType);
    }
    if (inputType === 'email' && this.state.email) {
      if (!isValidEmail(this.state.email)) errors.push('Please use a valid email address.')
    }
    if (errors.length) {
      console.error(errors);
      this.setState({ errors })
      return false
    }
    return true;
  }

  // const CONVO_ERRORS = {
  //   empty: {
  //     email: 'Invalid entry for the Email field.',
  //     title: 'Please provide a title for your petition.',
  //     summary: 'Please fill in the statement for your petition.',
  //     target: 'You must select at least one target for your petition.',
  //     description: 'Please provide background info for your petition.',
  //   },
  //   maxChar: {
  //     title: 50,
  //     summary: 200,
  //     description: 500
  //   },
  // }

  render() {

    const createType = this.props.params.type ? this.props.params.type : 'p';

    const elementByField = {
      title: this.titleInput,
      statement: this.statementInput,
      'target-national': this.nationalInput,
      'target-state': this.stateInput,
      'target-custom': this.customInput,
      about: this.aboutInput
    }

    const instructionStyle = { position: 'relative', top: -45 }
    const selectedElement = elementByField[this.state.selected]
    const bodyTop = document.body.getBoundingClientRect().top + 175

    if (typeof selectedElement !== 'undefined') {
      instructionStyle.top = selectedElement.getBoundingClientRect().top - bodyTop
    }

    if (createType === 'p') {
      return (
        <div className='moveon-petitions'>
          <CreatePetitionForm
            // Old
            // nationalOpen={this.state.nationalOpen}
            // stateOpen={this.state.stateOpen}
            // customOpen={this.state.customOpen}
            // instructionStyle={instructionStyle}

            updateStateFromValue={this.updateStateFromValue}

            // User
            user={this.state.user}
            name={this.state.name}
            email={this.state.email}
            zip={this.state.zip}
            password={this.state.password}
            passwordConfirm={this.state.passwordConfirm}

            // Steps
            nextStep={this.nextStep}
            step={this.state.step}

            // Toggles
            toggleOpen={this.toggleOpen}
            signupModalToggled={this.state.signupModalToggled}
            tipModalToggled={this.state.tipModalToggled}
            shareButtonsToggled={this.state.shareButtonsToggled}

            // Petition
            editPetition={this.state.editPetition}
            title={this.state.title}
            summary={this.state.summary}
            description={this.state.description}
            selectTarget={this.selectTarget}
            targetQuery={this.state.targetQuery}

            // Targets
            setSelected={this.setSelected}
            setRef={this.setRef}
            selected={this.state.selected}
            targets={this.state.target}
            onTargetAdd={this.onTargetAdd}
            onTargetRemove={this.onTargetRemove}
            customInputs={this.state.customInputs}
            onChangeCustomInputs={({ target: { name, value } }) => {
              this.setState(state => ({
                customInputs: { ...state.customInputs, [name]: value }
              }))
            }}

            publish={this.validateAndContinue}
          />
        </div>
      )
    } else {
      return (
        <div className='moveon-petitions'>
          <CreatePetitionFormConversation
            // Old
            setSelected={this.setSelected}
            setRef={this.setRef}
            selected={this.state.selected}
            nationalOpen={this.state.nationalOpen}
            stateOpen={this.state.stateOpen}
            customOpen={this.state.customOpen}
            instructionStyle={instructionStyle}

            updateStateFromValue={this.updateStateFromValue}
            getTargets={this.getTargets}
            errors={this.state.errors}

            // User
            name={this.state.name}
            email={this.state.email}

            // Steps
            nextStep={this.nextStep}
            step={this.state.step}

            section={this.state.section}
            nextSection={this.nextSection}

            // Toggles
            toggleOpen={this.toggleOpen}
            toggleConvoTip={this.toggleConvoTip}
            signupModalToggled={this.state.signupModalToggled}
            tipModalToggled={this.state.tipModalToggled}
            shareButtonsToggled={this.state.shareButtonsToggled}
            convoInputIsValid={this.state.convoInputIsValid}
            convoReviewToggled={this.state.convoReviewToggled}

            // Petition
            editPetition={this.state.editPetition}
            title={this.state.title}
            summary={this.state.summary}
            description={this.state.description}
            targetQuery={this.state.targetQuery}

            // Bubbles
            bubbleShow={this.state.bubbleShow}
            bubbleLoading={this.state.bubbleLoading}
            currentBubble={this.state.currentBubble}
            currentIndex={this.state.currentIndex}
            bubbleEdit={this.state.bubbleEdit}
            editBubble={this.editBubble}
            saveEditBubble={this.saveEditBubble}

            saveInput={this.saveInput}
            chatEnd={this.state.chatEnd}

            // Targets
            setSelected={this.setSelected}
            setRef={this.setRef}
            selected={this.state.selected}
            targets={this.state.target}
            onTargetAdd={this.onTargetAdd}
            onTargetRemove={this.onTargetRemove}
            customInputs={this.state.customInputs}
            onChangeCustomInputs={({ target: { name, value } }) => {
              this.setState(state => ({
                customInputs: { ...state.customInputs, [name]: value }
              }))
            }}
          />
        </div>
      )
    }
  }
}

// CreatePetition.defaultProps = {
//   initialPetition: {}
// }

CreatePetition.propTypes = {
  dispatch: PropTypes.func,
  initialPetition: PropTypes.object,
  location: PropTypes.object
}

export default withRouter(connect()(CreatePetition))
