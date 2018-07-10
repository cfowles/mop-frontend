import React from 'react'
import PropTypes from 'prop-types'

/* import About from './form/instructions/about'
import Statement from './form/instructions/statement'
import TargetCustom from './form/instructions/target-custom'
import TargetNational from './form/instructions/target-national'
import TargetState from './form/instructions/target-state'
import Title from './form/instructions/title' */
import Logo from 'GiraffeUI/logo'

// import CreatePetitionTarget from './create-petition-target'

// Steps
import Title from './ppp-steps/title'
import Summary from './ppp-steps/summary'
import Description from './ppp-steps/description'
// import Targets from './ppp-steps/targets'
import CreateTargets from '../../../containers/create-targets'
import Review from './ppp-steps/review'
import Share from './ppp-steps/share'
import Tip from './ppp-steps/tip'
import Signup from './ppp-steps/signup'
import '../../../../css/create.css'

import Config from '../../../config'
/* const instructionsByField = {
  title: <Title />,
  // statement: <Statement />,
  about: <About />
} */

const CreatePetitionForm = ({
  updateStateFromValue,
  getStateValue,
  nextStep,
  toggleOpen,
  onTargetAdd,
  onTargetRemove,
  onChangeCustomInputs,
  publish,
  targets,
  targetQuery
}) => {
  // Steps
  const titleStep = (<Title
    toggleOpen={toggleOpen}
    updateStateFromValue={updateStateFromValue}
    getStateValue={getStateValue}
    nextStep={nextStep}
  />)
  const summaryStep = (<Summary
    toggleOpen={toggleOpen}
    updateStateFromValue={updateStateFromValue}
    getStateValue={getStateValue}
    nextStep={nextStep}
  />)
  const descriptionStep = (<Description
    toggleOpen={toggleOpen}
    updateStateFromValue={updateStateFromValue}
    getStateValue={getStateValue}
    nextStep={nextStep}
  />)
  const targetsStep = (<CreateTargets
    toggleOpen={toggleOpen}
    nextStep={nextStep}
    updateStateFromValue={updateStateFromValue}
    getStateValue={getStateValue}
    onTargetAdd={onTargetAdd}
    onTargetRemove={onTargetRemove}
    onChangeCustomInputs={onChangeCustomInputs}
    targets={targets}
    targetQuery={targetQuery}
    theme='ppp'
  />)
  const reviewStep = (<Review
    toggleOpen={toggleOpen}
    updateStateFromValue={updateStateFromValue}
    getStateValue={getStateValue}
    nextStep={publish}
    onTargetAdd={onTargetAdd}
    onTargetRemove={onTargetRemove}
    onChangeCustomInputs={onChangeCustomInputs}
    targets={targets}
    targetQuery={targetQuery}
  />)
  const shareStep = (<Share
    toggleOpen={toggleOpen}
    getStateValue={getStateValue}
  />)

  // Modals
  const tip = (<Tip
    toggleOpen={toggleOpen}
    getStateValue={getStateValue}
  />)
  const signup = (<Signup
    afterSignup={nextStep}
    getStateValue={getStateValue}
    toggleOpen={toggleOpen}
    updateStateFromValue={updateStateFromValue}
    type='ppp'
  />)

  const name = getStateValue('name')
  const step = getStateValue('step')
  const nearbyCount = getStateValue('nearby_count')

  const progressWidth = `${(step / 6) * 100}%`
  const progressStyles = {
    width: progressWidth
  }

  return (
    <div id='ppp'>
      <div className='container-fluid ppp-page-heading bg-off-white'>
        <div className='progress-bar bg-azure' style={progressStyles} />
        <div className='background'>
          <img alt='background' src={`${Config.STATIC_ROOT}images/ppp-heading-background.svg`} />
        </div>
        <div className='row'>
          <div className='col-12 heading-title-wrap'>
            <Logo />
            <h2 className='bg-white'>
              {
              (step === 7 && `Congratulations, ${name}! Let’s get your first 10 signatures.`) ||
              (nearbyCount > 10 && `${nearbyCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} MoveOn members in your area have recently taken action.`) ||
              ('There are millions of MoveOn members waiting for your petition.')
            }
            </h2>
          </div>
        </div>
      </div>

      <form id='petition_form'>
        {step > 2 ? '' : titleStep}
        {step > 3 ? '' : summaryStep}
        {step < 2 || step > 4 ? '' : descriptionStep}
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
  toggleOpen: PropTypes.func,
  nextStep: PropTypes.func,
  updateStateFromValue: PropTypes.func,
  getStateValue: PropTypes.func,
  publish: PropTypes.func,
  onTargetAdd: PropTypes.func,
  onTargetRemove: PropTypes.func,
  onChangeCustomInputs: PropTypes.func,
  targets: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  targetQuery: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ])
}

export default CreatePetitionForm
