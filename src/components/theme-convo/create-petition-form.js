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

const CreatePetitionForm = ({
  selected,
  setSelected,
  nationalOpen,
  stateOpen,
  customOpen,
  instructionStyle,
  setRef,
  toggleOpen
}) => {
  const instructions = instructionsByField[selected]

  const national = !nationalOpen ? '' : <NationalTargetSelect />
  const state = !stateOpen ? '' : <StateTargetSelect />
  const custom = !customOpen ? '' : <CustomTargetSelect />

  return (
    <div className='container'>
      <div className='row'>
        <div className='background-moveon-light-gray span6 start-form'>
          <form id='petition_form'>
            <input value='' name='targets' id='targets_json' type='hidden' />
            <input value='' name='skin' type='hidden' />
            <input value='' name='source' type='hidden' />
            <input value='' name='cloned_from_id' type='hidden' />
            <input value='' name='solicit_id' type='hidden' />
            <fieldset id='start'>
              <span className='circle-number'>1</span>
              <span className='lanky-header moveon-dark-blue'>
                {' '}
                Start your petition Convo!
              </span>
              <div className='text wrapper big' id='text_name_wrapper'>
                <input
                  name='name'
                  id='name_field'
                  className='span6'
                  type='text'
                  title='Your Petition Title'
                  placeholder='Petition title'
                  onClick={setSelected('title')}
                  ref={setRef('titleInput')}
                />
              </div>
              <div className='text wrapper' id='text_statement_wrapper'>
                <textarea
                  className='span6 '
                  name='text_statement'
                  placeholder='What&rsquo;s the text of your petition? (Try to keep it to 1-2 sentences.)'
                  id='text_statement_field'
                  title='Text of your Petition'
                  onClick={setSelected('statement')}
                  ref={setRef('statementInput')}
                />
              </div>
            </fieldset>
            <div id='target_wrapper' className='' title='Choosing a Target'>
              <fieldset id='target' className=''>
                <span className='circle-number'>2</span>
                <span className='lanky-header moveon-dark-blue'>
                  Who&#39;s the target of your petition?
                </span>
                <div
                  className='checkbox wrapper'
                  id='national_group_wrapper'
                  title='Targeting the White House or Congress'
                  onClick={setSelected('target-national')}
                >
                  <label htmlFor='national_group' id='national_group_label'>
                    <input
                      name='national_group_checkbox'
                      id='national_group'
                      type='checkbox'
                      className='reveal_more_options'
                      onClick={toggleOpen('nationalOpen')}
                      ref={setRef('nationalInput')}
                    />{' '}
                    The White House or Congress
                  </label>
                  {national}
                </div>
                <div
                  className='checkbox wrapper'
                  id='state_group_wrapper'
                  title='Targeting Your Governor or State Legislature'
                  onClick={setSelected('target-state')}
                >
                  <label htmlFor='state_group' id='state_group_label'>
                    <input
                      name='state_group'
                      id='state_group'
                      type='checkbox'
                      className='reveal_more_options'
                      onClick={toggleOpen('stateOpen')}
                      ref={setRef('stateInput')}
                    />{' '}
                    Your governor or state legislature
                  </label>
                  {state}
                </div>
                <div
                  className='checkbox wrapper'
                  id='checkbox_custom_group_wrapper'
                  onClick={setSelected('target-custom')}
                >
                  <label
                    htmlFor='custom_group'
                    id='checkbox_custom_group_label'
                  >
                    <input
                      name='checkbox_custom_group'
                      id='custom_group'
                      type='checkbox'
                      className='reveal_more_options'
                      onClick={toggleOpen('customOpen')}
                      ref={setRef('customInput')}
                    />{' '}
                    Someone else (like a local official or corporate CEO)
                  </label>
                  {custom}
                </div>
              </fieldset>
            </div>
            <fieldset id='statement'>
              <span className='circle-number'>3</span>
              <span className='lanky-header moveon-dark-blue'>
                Why are you starting this petition?
              </span>
              <div className='text wrapper' id='text_about_wrapper'>
                <textarea
                  className='span6'
                  name='text_about'
                  id='text_about_field'
                  placeholder='What&rsquo;s your petition about? Have you been personally affected by the issue?'
                  title='Petition Background'
                  onClick={setSelected('about')}
                  ref={setRef('aboutInput')}
                />
              </div>
            </fieldset>
            <button
              type='button'
              className='xl300 center display-block background-moveon-bright-red'
              value='Preview The Petition'
              name='submit_button'
              id='submit_button'
            >
              Preview Petition <span className='triangle'>&#9654;</span>
            </button>
          </form>
        </div>
        <div className='span5 hidden-phone' style={instructionStyle}>
          <span
            className='icon-arrow-red-left hidden-phone'
            style={{ position: 'relative', top: 88 }}
          />
          <div className='hint'>{instructions}</div>
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
  toggleOpen: PropTypes.func
}

export default CreatePetitionForm
