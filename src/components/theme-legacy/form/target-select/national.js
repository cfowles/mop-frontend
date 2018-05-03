import React from 'react'

const NationalTargetSelect = () => (
  <div>
    <div id='national_group_checkboxes'>
      <div className='checkbox wrapper' id='target_house_wrapper'>
        <label htmlFor='target_house' id='target_house_label'>
          <input name='target_house_checkbox' id='target_house' type='checkbox' /> The entire U.S. House
        </label>
      </div>
      <div className='checkbox wrapper' id='target_senate_wrapper'>
        <label htmlFor='target_senate' id='target_senate_label'>
          <input name='target_senate_checkbox' id='target_senate' type='checkbox' /> The entire U.S. Senate
        </label>
      </div>
      <div className='checkbox wrapper' id='target_president_wrapper'>
        <label htmlFor='target_president' id='target_president_label'>
          <input name='target_president_checkbox' id='target_president' type='checkbox' /> President Donald Trump
        </label>
      </div>
    </div>
    <div className='autocomplete_selected' id='national_group_autocomplete_selected' />
    <div id='national_group_autocomplete_wrapper' className='autocomplete_wrapper text wrapper small'>
      <input name='national_group_autocomplete' type='text' className='text autocomplete' id='national_group_autocomplete' placeholder="Or, enter a specific legislator's name" />
    </div>
  </div>
)

export default NationalTargetSelect
