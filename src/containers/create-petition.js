import React from 'react'
import { loadTargets } from '../actions/createPetitionActions.js'
import ReactTimeout from 'react-timeout'
import { conversation } from '../components/theme-convo/conversation/conversation'

//import CreatePetitionForm from 'LegacyTheme/create-petition-form'
import CreatePetitionForm from 'Theme/create-petition-form'

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
  }

  componentDidMount() {
    this.callSection();
  }

  getSectionLengths() {
    // conversation.map(function (b, i) {
    //   if(b.hasOwnProperty('section')) {
        
    //   }
    // });
  }

  callSection() {
    this.setState({ bubbleLoading: true });
    let sectionLength = conversation[this.state.section].length;

    let loaderLength = 0
    conversation[this.state.section].map(function (b, i) {
      loaderLength += b.content.length;
    });
    let loaderTime = (loaderLength / 60) * 1000;
    this.loaderTimeout = setTimeout(function () {
      this.setState({ bubbleLoading: false });
    }.bind(this), loaderTime);

    this.callBubble(sectionLength);
  }

  callBubble(sectionLength) {
    let bubbleLength = conversation[this.state.section][this.state.currentBubble].content.length
    let bubbleTime = (bubbleLength / 60) * 1000;

    this.bubbleTimeout = setTimeout(() => {
      this.nextBubble();

      if (this.state.currentBubble < sectionLength ) {
        this.callBubble(sectionLength);
      } else {
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
      const prev = prevState.step;
      let newStep = prev + 1;
      return { step: newStep, signupModalToggled: false }
    })
  }

  saveInput() {
    this.nextSection();
    this.callSection();
  }

  nextSection() {
    this.setState(prevState => {
      const prev = prevState.section;
      let newSection = prev + 1;
      return { section: newSection }
    })
  }
  nextBubble() {
    this.setState(prevState => {
      const prevBubble = prevState.currentBubble;
      let newBubble = prevBubble + 1;
      const prevIndex = prevState.currentIndex;
      let newIndex = prevIndex + 1;
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

  /* conversational scrolling
  scrollToBottom() {
    this.chatEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  */

  render() {
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
        />
      </div>
    )
  }
}

export default CreatePetition
