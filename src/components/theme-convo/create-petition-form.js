import React from 'react'
import PropTypes from 'prop-types'

import About from './form/instructions/about'
import Statement from './form/instructions/statement'
import TargetCustom from './form/instructions/target-custom'
import TargetNational from './form/instructions/target-national'
import TargetState from './form/instructions/target-state'
import Title from './form/instructions/title'
import CustomTargetSelect from './form/target-select/custom'
import NationalTargetSelect from './form/target-select/national'
import StateTargetSelect from './form/target-select/state'

import Welcome from './conversation/welcome'
import Email from './conversation/email'

const instructionsByField = {
  title: <Title />,
  statement: <Statement />,
  'target-national': <TargetNational />,
  'target-state': <TargetState />,
  'target-custom': <TargetCustom />,
  about: <About />
}

const CreatePetitionForm = ({
  selected,
  setSelected,
  nationalOpen,
  stateOpen,
  customOpen,
  instructionStyle,
  setRef,
  toggleOpen,
  updateStateFromValue
}) => {
  const instructions = instructionsByField[selected]

  const national = !nationalOpen ? '' : <NationalTargetSelect />
  const state = !stateOpen ? '' : <StateTargetSelect />
  const custom = !customOpen ? '' : <CustomTargetSelect />

  return (
    <div id='conversational'>
      <div className='chat-wrap'>
        <Welcome />
        <Email emailOnChange={updateStateFromValue('email')} />
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>
    </div>
  )
}

CreatePetitionForm.propTypes = {
  selected: PropTypes.string,
  setSelected: PropTypes.func,
  nationalOpen: PropTypes.bool,
  stateOpen: PropTypes.bool,
  customOpen: PropTypes.bool,
  instructionStyle: PropTypes.object,
  setRef: PropTypes.func,
  toggleOpen: PropTypes.func,
  updateStateFromValue: PropTypes.func,
}

export default CreatePetitionForm
