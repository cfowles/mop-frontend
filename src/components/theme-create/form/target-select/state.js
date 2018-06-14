import React from 'react'

import StateSelect from '../state-select'

const StateTargetSelect = () => (
  <div>
    <div className='select wrapper' id='select_target_state_wrapper'>
      <label htmlFor='select_target_state' id='select_target_state_label'>Pick your state</label>
      <StateSelect
        name='select_target_state'
        id='state'
        className=''
        onlyStates
      />
    </div>
    <div id='state_group_checkboxes'>
      <div className='checkbox wrapper' id='checkbox_state_house_wrapper'>
        <label htmlFor='target_statehouse' id='checkbox_state_house_label'>
          <input name='target_statehouse_field' id='target_statehouse' type='checkbox' /> The entire <span className='state_name'>State</span> House
        </label>
      </div>
      <div className='checkbox wrapper' id='checkbox_state_senate_wrapper'>
        <label htmlFor='target_statesenate' id='checkbox_state_senate_label'>
          <input name='target_statesenate_field' id='target_statesenate' type='checkbox' /> The entire <span className='state_name'>State</span> Senate
        </label>
      </div>
      <div className='checkbox wrapper' id='checkbox_state_governor_wrapper'>
        <label htmlFor='target_governor' id='checkbox_state_governor_label'>
          <input name='target_governor_field' id='target_governor' type='checkbox' /> Governor of <span className='state_name'>State</span>
        </label>
      </div>
    </div>
    <div className='autocomplete_selected' id='state_group_autocomplete_selected'></div>
    <div id='state_group_autocomplete_wrapper' className='autocomplete_wrapper text wrapper small'>
      <input name='state_group_autocomplete' type='text' className='text autocomplete' id='state_group_autocomplete' placeholder="Or, enter a specific legislator's name" />
    </div>
  </div>
)

export default StateTargetSelect
