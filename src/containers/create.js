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

const ERRORS = {
  name: 'Please provide a title for your petition.',
  text_statement: 'Please fill in the statement for your petition.',
  target: 'You must select at least one target for your petition.',
  text_about: 'Please provide background info for your petition.',
  email: 'Invalid entry for the Email field.'
}

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
      name: 'test',
      email: 'test@email.com',
      country: 'United States',
      zip: '28105',
      password: 'test',
      passwordConfirm: 'test',

      // Toggles
      signupModalToggled: false,
      tipModalToggled: false,
      shareButtonsToggled: false,
      editPetition: false,

      // Petition Data
      title: initialPetition.title || [],
      summary: initialPetition.summary || [],
      target: initialPetition.target || [],
      description: initialPetition.description || [],
      //title: false,
      //summary: false,
      //description: false,
      selectedTargets: [],
      targetQuery: false,

      /*** Convo ***/
      section: 0,
      sectionLengths: [],

      // Bubbles
      currentBubble: 0,
      currentIndex: 0,
      bubbleShow: false,
      bubbleLoading: false
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
  }

  componentDidMount() {
    var uinput = document.getElementById('user-input');
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
      document.getElementById("user-input").focus();

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
    this.setState(prevState => {
      const newBubble = prevState.currentBubble + 1;
      const newIndex = prevState.currentIndex + 1;
      return { currentBubble: newBubble, currentIndex: newIndex }
    })
  }

  // toggleConvoTip(tip) {
  //   return () => {
  //     console.log(tip)
  //     console.log(this.state)
  //     this.setState({ step: tip });
  //     console.log(this.state)
  //     this.toggleOpen('tipModalToggled');
  //   }
  // }

  // conversational scrolling
  scrollToBottom() {
    document.querySelector('.chat-end').scrollIntoView({ behavior: "smooth" });
  }

  componentDidUpdate() {
    if (document.querySelector('.chat-end')) {
      this.scrollToBottom();
    }
  }



  // PPP
  toggleOpen(element, id = 0) {
    return () => {
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
      if (!isCustom && this.state.target.find(old => old.label === target.label)) return // already exists

      if (isCustom && !this.state.customInputs.name) return // Trying to add a blank custom target

      if (isCustom) {
        this.setState({ customInputs: { name: '', email: '', title: '' } })
      }

      this.setState(
        state => ({ target: [...state.target, target] }),
        () => callback && callback()
      )
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

    if (inputType === 'email') errorKey = 'email'
    if (inputType === 'title') errorKey = 'name';
    if (inputType === 'summary') errorKey = 'text_statement';
    if (inputType === 'target') errorKey = 'target';
    if (inputType === 'description') errorKey = 'text_about';

    if (!this.state[inputType]) errors.push(ERRORS[errorKey]);
    if (errors.length) {
      console.error(errors);
      this.setState({ errors })
      return false
    }
    return true;
  }


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

            saveInput={this.saveInput}
            chatEnd={this.state.chatEnd}
          />
        </div>
      )
    }
  }
}

CreatePetition.defaultProps = {
  initialPetition: {}
}

CreatePetition.propTypes = {
  dispatch: PropTypes.func,
  initialPetition: PropTypes.object,
  location: PropTypes.object
}

export default withRouter(connect()(CreatePetition))
