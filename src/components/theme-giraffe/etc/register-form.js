import React from 'react'
import PropTypes from 'prop-types'

import About from './form/instructions/about'
// import Statement from './form/instructions/statement'
import TargetCustom from './form/instructions/target-custom'
import TargetNational from './form/instructions/target-national'
import TargetState from './form/instructions/target-state'
// import Title from './form/instructions/title'

import CreatePetitionTarget from './create-petition-target'

// Steps
import Title from './ppp-steps/title'
import Statement from './ppp-steps/statement'
import Background from './ppp-steps/background'
import Targets from './ppp-steps/targets'
import Review from './ppp-steps/review'
import Share from './ppp-steps/share'
import Tip from './ppp-steps/tip'
import Signup from './ppp-steps/signup'

const instructionsByField = {
  title: <Title />,
  statement: <Statement />,
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

  // User
  name,
  email,
  zip,
  password,
  confirmPassword,

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
  background,
  selectTarget,
  targets,
  selectedTargets,
}) => {
  const instructions = instructionsByField[selected]

  const national = !nationalOpen ? '' : <NationalTargetSelect />
  const state = !stateOpen ? '' : <StateTargetSelect />
  const custom = !customOpen ? '' : <CustomTargetSelect />

  // Steps
  const titleStep =       <Title
                            tipModalToggled={tipModalToggled}
                            toggleOpen={toggleOpen}
                            updateStateFromValue={updateStateFromValue}
                            step={step}
                            title={title}
                            nextStep={nextStep} />
  const statementStep =   <Statement
                            tipModalToggled={tipModalToggled}
                            toggleOpen={toggleOpen}
                            updateStateFromValue={updateStateFromValue}
                            step={step}
                            statement={statement}
                            nextStep={nextStep} />
  const backgroundStep =  <Background
                            tipModalToggled={tipModalToggled}
                            toggleOpen={toggleOpen}
                            updateStateFromValue={updateStateFromValue}
                            step={step}
                            background={background}
                            nextStep={nextStep} />
  const targetsStep =     <Targets
                            tipModalToggled={tipModalToggled}
                            toggleOpen={toggleOpen}
                            updateStateFromValue={updateStateFromValue}
                            step={step}
                            nextStep={nextStep}
                            selectTarget={selectTarget}
                            targets={targets}
                            selectedTargets={selectedTargets}/>
  const reviewStep =      <Review
                            tipModalToggled={tipModalToggled}
                            toggleOpen={toggleOpen}
                            editPetition={editPetition}
                            title={title} statement={statement}
                            background={background}
                            updateStateFromValue={updateStateFromValue}
                            step={step}
                            nextStep={nextStep} />
  const shareStep =       <Share
                            shareButtonsToggled={shareButtonsToggled}
                            toggleOpen={toggleOpen}
                            step={step} />

  // Modals
  const tip =             <Tip
                            tipModalToggled={tipModalToggled}
                            toggleOpen={toggleOpen}
                            step={step} />
  const signup =          <Signup
                            nextStep={nextStep}
                            step={step}
                            signupModalToggled={signupModalToggled}
                            toggleOpen={toggleOpen}
                            updateStateFromValue={updateStateFromValue}
                            name={name}
                            email={email}
                            zip={zip}
                            password={password}
                            confirmPassword={confirmPassword}
                            />

  const progressWidth = (step / 6) * 100 +'%';
  const progressStyles = {
    width: progressWidth
  }

  return (
    <div id="ppp">
      <div className="container-fluid ppp-page-heading bg-off-white">
        <div className="progress-bar bg-azure" style={progressStyles}></div>
        <div className="background">
          <img src="../../../local/images/ppp-heading-background.svg" />
        </div>
        <div className="row">
          <div className="col-12 heading-title-wrap">
            <h2 className="bg-white">{step === 7 ? 'Congratulations, '+{name}+'! Let’s get your first 10 signatures.' : 'There are millions of MoveOn members waiting for your petition.'}</h2>
          </div>
        </div>
      </div>

      <form id='petition_form'>
        {step > 2 ? '' : titleStep}
        {step > 3 ? '' : statementStep}
        {step < 2 || step > 4 ? '' : backgroundStep}
        {step < 3 || step > 5 ? '' : targetsStep}
        {step < 4 || step > 6 ? '' : reviewStep}
        {step < 5 ? '' : shareStep}
        {step < 5 ? tip : ''}
      </form>
      {signup}
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
