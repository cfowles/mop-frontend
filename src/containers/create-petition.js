import React from 'react'
import { loadTargets } from '../actions/createPetitionActions.js'

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

      // Steps
      step: 1,
      section: 'email',

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

      // Petition
      title: false,
      statement: false,
      background: false
    }
    this.setSelected = this.setSelected.bind(this)
    this.setRef = this.setRef.bind(this)
    this.toggleOpen = this.toggleOpen.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.updateStateFromValue = this.updateStateFromValue.bind(this)
    this.getTargets = this.getTargets.bind(this)
    this.nextSection = this.nextSection.bind(this)
  }

  setSelected(name) {
    return () => this.setState({ selected: name })
  }

  setRef(name) {
    return input => input && (this[name] = input)
  }
  toggleOpen(element) {
    console.log(element, this.state);
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

  nextSection() {
    return () => this.setState(prevState => {
      let newSection = 'title'
      return { section: newSection }
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
  getTargets(){
    return()=>{
      const targets = loadTargets();
      console.log(targets);
    }
  }

  /*For conversational scrolling
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }*/

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
        />
      </div>
    )
  }
}

export default CreatePetition
