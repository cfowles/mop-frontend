import React from 'react'
import { expect } from 'chai'
import sinon from 'sinon'
import { Provider } from 'react-redux'
import { createMockStore } from 'redux-test-utils'
import { mount } from 'enzyme'

import CreatePetitionTarget from '../../src/containers/create-petition-target'
import targets from '../../local/api/v1/targets.json'

describe('<CreatePetitionTarget />', () => {
  const store = createMockStore({ petitionTargetsStore: { national: targets } })
  it('calls onTargetAdd when an option is clicked', () => {
    const onChange = sinon.spy()
    const component = mount(
      <Provider store={store}>
        <CreatePetitionTarget
          setSelected={() => {}}
          setRef={() => {}}
          targets={[]}
          onTargetAdd={onChange}
        />
      </Provider>
    )
    // Open the national target group
    component
      .find('input[name="checkbox_national_group"]')
      .simulate('change', { target: { checked: true } })

    // Click the first item (Donald Trump)
    component
      .find('#national_group_checkboxes input[type="checkbox"]')
      .first()
      .simulate('change', { target: { checked: true } })

    expect(onChange.firstCall.args[0]).to.equal(targets[0])
  })

  it('calls remove when a selected option is clicked', () => {
    const onChange = sinon.spy()
    const component = mount(
      <Provider store={store}>
        <CreatePetitionTarget
          targets={[targets[0]]} // Donald Trump already selected
          setSelected={() => {}}
          setRef={() => {}}
          onTargetRemove={onChange}
        />
      </Provider>
    )

    // Click the first item (Donald Trump)
    component
      .find('#national_group_checkboxes input[type="checkbox"]')
      .first()
      .simulate('change', { target: { checked: false } })

    expect(onChange.firstCall.args[0]).to.equal(targets[0])
  })
})
