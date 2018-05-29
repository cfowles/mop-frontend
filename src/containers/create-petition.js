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
      step: 0,
      name: false,
      email: false,
      country: 'United States',
      zip: false
    }
    this.setSelected = this.setSelected.bind(this)
    this.setRef = this.setRef.bind(this)
    this.toggleOpen = this.toggleOpen.bind(this)
    this.updateStateFromValue = this.updateStateFromValue.bind(this)
  }

  setSelected(name) {
    return () => this.setState({ selected: name })
  }

  setRef(name) {
    return input => input && (this[name] = input)
  }

  toggleOpen() {
    return () => this.setState(prevState => {
      const prev = prevState.step;
      let newStep = prev + 1;
      console.log(this.state);
      return { step: newStep }
    })
  }

  updateStateFromValue(field, isCheckbox = false) {
    return (event) => {
      const value = isCheckbox ? event.target.checked : event.target.value
      console.log(value)
      this.setState({
        [field]: value
      })
    }
  }

  /*For conversational scrolling
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
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
          setSelected={this.setSelected}
          setRef={this.setRef}
          toggleOpen={this.toggleOpen}
          selected={this.state.selected}
          nationalOpen={this.state.nationalOpen}
          stateOpen={this.state.stateOpen}
          customOpen={this.state.customOpen}
          instructionStyle={instructionStyle}
          step={this.state.step}
          updateStateFromValue={this.updateStateFromValue}
        />
      </div>
    )
  }
}

export default CreatePetition
