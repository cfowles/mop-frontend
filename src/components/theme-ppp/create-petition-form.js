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

// Steps
import PetitionTitle from './petition-form-elements/petition-title'
import PetitionStatement from './petition-form-elements/petition-statement'
import PetitionBackground from './petition-form-elements/petition-background'
import PetitionTargets from './petition-form-elements/petition-targets'
import PetitionMedia from './petition-form-elements/petition-media'
import PetitionReview from './petition-form-elements/petition-review'
import PetitionTip from './petition-form-elements/petition-tip'
import PetitionSignup from './petition-form-elements/petition-signup'

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
  nextStep,
  step,
  toggleSignupModal,
  toggleTipModal,
  tipModalActive,
  signupModalActive
}) => {
  const instructions = instructionsByField[selected]

  const national = !nationalOpen ? '' : <NationalTargetSelect />
  const state = !stateOpen ? '' : <StateTargetSelect />
  const custom = !customOpen ? '' : <CustomTargetSelect />

  const petitionTitle = step !== 1 ? '' : <PetitionTitle />
  const petitionStatement = step !== 2 ? '' : <PetitionStatement />
  const petitionBackground = step !== 3 ? '' : <PetitionBackground />
  const petitionTargets = step !== 4 ? '' : <PetitionTargets />
  const petitionMedia = step !== 5 ? '' : <PetitionMedia />
  const petitionReview = step !== 6 ? '' : <PetitionReview />
  const petitionTip = tipModalActive ? <PetitionTip /> : ''
  const petitionSignup = signupModalActive ? <PetitionSignup /> : ''

  return (
    <div id="ppp">
      <div className="container-fluid ppp-page-heading">
        <div className="row">
          <div className="col-12 heading-title-wrap">
            <h2>There are millions of MoveOn members waiting for your petition.</h2>
          </div>
        </div>
      </div>

      <form id='petition_form'>
        {petitionTitle}
        {petitionStatement}
        {petitionBackground}
        {petitionTargets}
        {petitionMedia}
        {petitionReview}
        {petitionSignup}
        {petitionTip}


        <button type="button" className="xl300 center display-block ppp-btn" value="Preview The Petition" name="submit_button" id="submit_button" onClick={step === 1 || step === 6 ? toggleSignupModal() : nextStep()}>
          Next
        </button>
      </form>
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
  nextStep: PropTypes.func,
  toggleSignupModal: PropTypes.func,
  toggleTipModal: PropTypes.func
}

export default CreatePetitionForm
