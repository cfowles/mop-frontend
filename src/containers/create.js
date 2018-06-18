import React from 'react'
//import PropTypes from 'prop-types'
import { loadTargets } from '../actions/createPetitionActions.js'
import ReactTimeout from 'react-timeout'
import { conversation } from '../components/theme-create/conversation/conversation'

//import CreatePetitionForm from 'LegacyTheme/create-petition-form'
import CreatePetitionForm from 'Theme/etc/create-petition-form'
import CreatePetitionFormConversation from 'Theme/etc/create-petition-form-conversation'

class CreatePetition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // Old
      selected: 'title',
      nationalOpen: false,
      stateOpen: false,
      customOpen: false,

      /*** PPP ***/
      step: 1,

      // User Data
      name: false,
      email: false,
      country: 'United States',
      zip: false,

      // Toggles
      signupModalToggled: false,
      tipModalToggled: false,
      shareButtonsToggled: false,
      editPetition: false,

      // Petition Data
      title: false,
      statement: false,
      background: false,
      targets: [
        {title: "The White House", subtitle: "The President", name: "president"},
        {title: "The U.S.", subtitle: "Senate", name: "us-senate"},
        {title: "The U.S.", subtitle: "House of Representatives", name: "us-representatives"},
        {title: "Senate", subtitle: "of Utah", name: "ut-senate"},
      ],
      selectedTargets: [],

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
    this.nextStep = this.nextStep.bind(this)
    this.updateStateFromValue = this.updateStateFromValue.bind(this)
    this.getTargets = this.getTargets.bind(this)
    this.nextSection = this.nextSection.bind(this)
    this.callSection = this.callSection.bind(this)
    this.callBubble = this.callBubble.bind(this)
    this.nextBubble = this.nextBubble.bind(this)
    this.saveInput = this.saveInput.bind(this)
    this.getSectionLengths = this.getSectionLengths.bind(this)
    this.selectTarget = this.selectTarget.bind(this)
  }

  componentDidMount() {
    //document.querySelector('.user-input').focus();

    this.getSectionLengths();
    this.initSection = setTimeout(function() {
      this.callSection();
    }.bind(this), 500)
  }

  getSectionLengths() {
    let sections = [];
    let sectionLengths = [];
    let count = 0;
    conversation.map(function (el) {
      if(el.hasOwnProperty('section')) {
        sections.push(el.section);
      }
    });
    for(let i = 0; i < sections[sections.length - 1]; i++){
      sections.map(function(el,ind) {
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

      if (this.state.currentBubble < sectionLength ) {
        this.callBubble(sectionLength);
      } else {
        this.setState({ bubbleLoading: false });
        this.setState({ currentBubble: 0 });
      }
    }, bubbleTime)
  }

  setSelected(name) {
    return () => this.setState({ selected: name })
  }

  setRef(name) {
    return input => input && (this[name] = input)
  }
  toggleOpen(element) {
    return () => this.setState(prevState => {
      const prev = prevState[element]
      return { [element]: !prev }
    })
  }
  nextStep() {
    return () => this.setState(prevState => {
      let newStep = prevState.step + 1;
      return { step: newStep, signupModalToggled: false }
    })
  }

  saveInput() {
    this.nextBubble();
    this.setState({ currentBubble: 0 });
    document.getElementById(".user-input").value = "";
    document.getElementById(".user-input").focus();

    this.inputTimeout = setTimeout(function(){
      this.nextSection();
      this.callSection();
    }.bind(this), 500)
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

  updateStateFromValue(field, isCheckbox = false) {
    return (event) => {
      const value = isCheckbox ? event.target.checked : event.target.value
      this.setState({
        [field]: value
      })
    }
  }

  getTargets() {
    // return () => {
    //   const targets = loadTargets();
    // }
  }

  selectTarget(ind) {
    let selected = this.state.targets[ind];
    this.setState(prevState => {
      let selectedTargets = prevState.selectedTargets;
      selectedTargets.push(selected);
      return { selectedTargets: selectedTargets }
    })
  }

  // conversational scrolling
  // scrollToBottom() {
  //   document.querySelector('.chat-end').scrollIntoView({ behavior: "smooth" });
  // }

  // componentDidUpdate() {
  //   this.scrollToBottom();
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

    if(createType === 'p'){
      return (
        <div className='moveon-petitions'>
          <CreatePetitionForm
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

            // User
            name={this.state.name}
            email={this.state.email}
            zip={this.state.zip}

            // Steps
            nextStep={this.nextStep}
            step={this.state.step}

            section={this.state.section}
            nextSection={this.nextSection}

            // Toggles
            toggleOpen={this.toggleOpen}
            signupModalToggled={this.state.signupModalToggled}
            tipModalToggled={this.state.tipModalToggled}
            shareButtonsToggled={this.state.shareButtonsToggled}

            // Petition
            editPetition={this.state.editPetition}
            title={this.state.title}
            statement={this.state.statement}
            background={this.state.background}
            selectTarget={this.selectTarget}

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
            signupModalToggled={this.state.signupModalToggled}
            tipModalToggled={this.state.tipModalToggled}
            shareButtonsToggled={this.state.shareButtonsToggled}

            // Petition
            editPetition={this.state.editPetition}
            title={this.state.title}
            statement={this.state.statement}
            background={this.state.background}

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

export default CreatePetition
