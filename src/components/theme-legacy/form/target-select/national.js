import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LegislatorAutocomplete from './legislator-autocomplete'

const isDefault = target =>
  ['president', 'house', 'senate'].indexOf(target.target_type) !== -1

const NationalTargetSelect = ({ selected, onSelect, remove, items }) => (
  <div>
    <div id='national_group_checkboxes'>
      {items.filter(isDefault).map(defaultItem => {
        const isChecked = selected.filter(t => t.value === defaultItem.value)
          .length
        return (
          <div key={defaultItem.label} className='checkbox wrapper'>
            <label>
              <input
                type='checkbox'
                onChange={() =>
                  (isChecked ? remove(defaultItem) : onSelect(defaultItem))
                }
                checked={isChecked}
              />{' '}
              {defaultItem.label}
            </label>
          </div>
        )
      })}
      {selected.filter(t => !isDefault(t)).map(selectedItem => (
        <div key={selectedItem.label} className='checkbox wrapper'>
          <label>
            <input
              type='checkbox'
              onChange={() => remove(selectedItem)}
              checked
            />{' '}
            {selectedItem.label}
          </label>
        </div>
      ))}
    </div>
    <div className='autocomplete_wrapper text wrapper small'>
      <LegislatorAutocomplete
        group='national'
        onChange={onSelect}
        items={items.filter(t => !isDefault(t))}
      />
    </div>
  </div>
)

function mapStateToProps(store) {
  return {
    items:
      (store.petitionTargetsStore && store.petitionTargetsStore.national) || []
  }
}

NationalTargetSelect.propTypes = {
  selected: PropTypes.array,
  onSelect: PropTypes.func,
  remove: PropTypes.func,
  items: PropTypes.array
}

export default connect(mapStateToProps)(NationalTargetSelect)
