import React from 'react'

//import CreatePetitionForm from 'LegacyTheme/create-petition-form'
import CreatePetitionForm from 'Theme/create-petition-form'

class CreatePetition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'title',
      nationalOpen: false,
      stateOpen: false,
      customOpen: false,
      step: 1,
      signupModalActive: false,
      tipModalActive: false
    }
    this.setSelected = this.setSelected.bind(this)
    this.setRef = this.setRef.bind(this)
    this.toggleOpen = this.toggleOpen.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.toggleSignupModal = this.toggleSignupModal.bind(this)
    this.toggleTipModal = this.toggleTipModal.bind(this)
    this.toggleSignupModal = this.toggleSignupModal.bind(this)
    this.toggleTipModal = this.toggleTipModal.bind(this)
  }

  setSelected(name) {
    return () => this.setState({ selected: name })
  }

  setRef(name) {
    return input => input && (this[name] = input)
  }
  toggleOpen(section) {
    return () => this.setState(prevState => {
      const prev = prevState[section]
      return { [section]: !prev }
    })
  }
  nextStep() {
    return () => this.setState(prevState => {
      const prev = prevState.step;
      let newStep = prev + 1;
      console.log(this.state);
      return { step: newStep }
    })
  }
  toggleSignupModal() {
    return () => this.setState(prevState => {
      const prev = prevState.signupModalActive;
      return { signupModalActive: !prev }
    })
  }
  toggleTipModal() {
    return () => this.setState(prevState => {
      const prev = prevState.tipModalActive;
      return { tipModalActive: !prev }
    })
  }

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
          setSelected={this.setSelected}
          setRef={this.setRef}
          toggleOpen={this.toggleOpen}
          nextStep={this.nextStep}
          selected={this.state.selected}
          nationalOpen={this.state.nationalOpen}
          stateOpen={this.state.stateOpen}
          customOpen={this.state.customOpen}
          instructionStyle={instructionStyle}
          step={this.state.step}
          signupModalActive={this.state.signupModalActive}
          tipModalActive={this.state.tipModalActive}
          toggleSignupModal={this.toggleSignupModal}
          toggleTipModal={this.toggleTipModal}
        />
      </div>
    )
  }
}

export default CreatePetition
