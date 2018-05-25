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

const instructionsByField = {
  title: <Title />,
  statement: <Statement />,
  'target-national': <TargetNational />,
  'target-state': <TargetState />,
  'target-custom': <TargetCustom />,
  about: <About />
}
const Step1 = () => (
  <div className='step1 ppp-step container'>
    <div className="row ppp-item">
      <div className="col-12">
        <p>Let’s launch your petition! From Local to National, we want to give your voice a platform to help you create progressive change.  </p>
      </div>
      <div className="col-12 ppp-heading">
        <h3>Petition title</h3>
        <div className="ppp-tip">
          Tips
                <span></span>
        </div>
      </div>
      <div className="col-12">
        <p>
          Start with a petition title - successful titles are brief, like a newspaper headline.
              </p>
      </div>
      <div className="col-12">
        <input name="title" id="title_field" className="" type="text" title="Title" placeholder="Your petition title" />
      </div>
    </div>
  </div>
)

const CreatePetitionForm = ({
  selected,
  setSelected,
  nationalOpen,
  stateOpen,
  customOpen,
  instructionStyle,
  setRef,
  toggleOpen,
  step
}) => {
  const instructions = instructionsByField[selected]

  const national = !nationalOpen ? '' : <NationalTargetSelect />
  const state = !stateOpen ? '' : <StateTargetSelect />
  const custom = !customOpen ? '' : <CustomTargetSelect />
  const step1 = step !== 1 ? '' : <Step1 />

  return (
    <div id="ppp">
      <div className="container-fluid ppp-page-heading">
        <div className="row">
          <div className="col-12 heading-title-wrap">
            <h2>There are millions of MoveOn members waiting for your petition.</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button
              // className='span6 '
              // name='text_statement'
              // placeholder='What&rsquo;s the text of your petition? (Try to keep it to 1-2 sentences.)'
              // id='text_statement_field'
              // title='Text of your Petition'
              onClick={toggleOpen()}
            >Next Step</button>
          </div>
        </div>
      </div>
      {step1}
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
  toggleOpen: PropTypes.func
}

export default CreatePetitionForm
