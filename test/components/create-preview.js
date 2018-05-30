import React from 'react'
import { expect } from 'chai'

import { Provider } from 'react-redux'
import { createMockStore } from 'redux-test-utils'

import { mount } from 'enzyme'

import CreatePreview from '../../src/containers/create-preview'
import RegisterForm from '../../src/containers/register-form'

describe('<CreatePreview />', () => {
  const petition = {
    title: 'testtitle',
    target: [{ name: 'testtarget' }],
    summary: 'testsummary',
    description: 'testdescription'
  }
  const store = createMockStore({ petitionCreateStore: petition })
  const preview = mount(
    <Provider store={store}>
      <CreatePreview />
    </Provider>
  )

  it('displays title', () => {
    expect(preview.text()).to.contain('testtitle')
  })

  it('displays target', () => {
    expect(preview.text()).to.contain('to be delivered to testtarget')
  })

  it('displays summary', () => {
    expect(preview.text()).to.contain('testsummary')
  })

  it('displays description', () => {
    expect(preview.text()).to.contain('testdescription')
  })

  it('displays register form', () => {
    const form = preview.find(RegisterForm)
    expect(form.length).to.equal(1)
    expect(form.props()).to.contain({
      includeZipAndPhone: true,
      useAlternateFields: true,
      useLaunchButton: true
    })
    expect(typeof form.prop('successCallback')).to.equal('function')
  })

  it('redirects when there is no petition', () => {
    const emptyStore = createMockStore({ petitionCreateStore: {} })
    mount(
      <Provider store={emptyStore}>
        <CreatePreview />
      </Provider>
    )
    expect(document.location.toString()).to.contain('create_start.html')
  })
})
