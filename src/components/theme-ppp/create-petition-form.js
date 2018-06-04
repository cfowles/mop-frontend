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
// import PetitionMedia from './petition-form-elements/petition-media'
import PetitionReview from './petition-form-elements/petition-review'
import PetitionShare from './petition-form-elements/petition-share'
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
  // Old
  selected,
  setSelected,
  nationalOpen,
  stateOpen,
  customOpen,
  instructionStyle,
  setRef,

  updateStateFromValue,
  getTargets,

  // Steps
  nextStep,
  step,

  // Toggles
  toggleOpen,
  tipModalToggled,
  signupModalToggled,
  shareButtonsToggled,

  // Petition
  editPetition,
  title,
  statement,
  background
}) => {
  const instructions = instructionsByField[selected]

  const national = !nationalOpen ? '' : <NationalTargetSelect />
  const state = !stateOpen ? '' : <StateTargetSelect />
  const custom = !customOpen ? '' : <CustomTargetSelect />

  const petitionTitle = step !== 1 ? '' : <PetitionTitle tipModalToggled={tipModalToggled} toggleOpen={toggleOpen} updateStateFromValue={updateStateFromValue}/>
  const petitionStatement = step !== 2 ? '' : <PetitionStatement tipModalToggled={tipModalToggled} toggleOpen={toggleOpen} updateStateFromValue={updateStateFromValue}/>
  const petitionBackground = step !== 3 ? '' : <PetitionBackground tipModalToggled={tipModalToggled} toggleOpen={toggleOpen} updateStateFromValue={updateStateFromValue}/>
  const petitionTargets = step !== 4 ? '' : <PetitionTargets tipModalToggled={tipModalToggled} toggleOpen={toggleOpen} updateStateFromValue={updateStateFromValue}/>
  // const petitionMedia = step !== 5 ? '' : <PetitionMedia tipModalToggled={tipModalToggled} toggleOpen={toggleOpen} />
  const petitionReview = step !== 5 ? '' : <PetitionReview tipModalToggled={tipModalToggled} toggleOpen={toggleOpen}  editPetition={editPetition} title={title} statement={statement} background={background} updateStateFromValue={updateStateFromValue}/>
  const petitionShare = step !== 6 ? '' : <PetitionShare shareButtonsToggled={shareButtonsToggled} toggleOpen={toggleOpen} />
  const petitionTip = tipModalToggled ? <PetitionTip tipModalToggled={tipModalToggled} toggleOpen={toggleOpen} step={step} /> : ''
  const petitionSignup = signupModalToggled ? <PetitionSignup nextStep={nextStep} step={step} signupModalToggled={signupModalToggled} toggleOpen={toggleOpen} updateStateFromValue={updateStateFromValue}/> : ''

  return (
    <div id="ppp">
      <div className="container-fluid ppp-page-heading">
        <div className="row">
          <div className="col-12 heading-title-wrap">
            <h2>{step === 7 ? 'Congratulations, '+{name}+'! Let’s get your first 10 signatures.' : 'There are millions of MoveOn members waiting for your petition.'}</h2>
          </div>
        </div>
        <button onClick={getTargets()}>Get Targets</button>
      </div>

      <form id='petition_form'>
        {petitionTitle}
        {petitionStatement}
        {petitionBackground}
        {petitionTargets}
        {/*petitionMedia*/}
        {petitionReview}
        {petitionShare}
        {petitionSignup}
        {petitionTip}


        <button type="button" className="xl300 center display-block ppp-btn" value="Preview The Petition" name="submit_button" id="submit_button" onClick={step === 1 || step === 6 ? toggleOpen('signupModalToggled') : nextStep()}>
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
  updateStateFromValue: PropTypes.func,
  getTargets: PropTypes.func
}

export default CreatePetitionForm
