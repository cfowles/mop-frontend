import React from 'react'
import { expect } from 'chai'

import { mount } from 'enzyme'

import { WrappedComponent as SignatureListItem } from '../../src/containers/signature-list-item'

describe('<SignatureListItem />', () => {
  const user = {
    city: 'Nottingham',
    state: 'England',
    name: 'Ada Lovelace'
  }
  const createdDate = '1836-12-10T05:53:16.410531Z'

  it('is a div.signer', () => {
    const context = mount(<SignatureListItem user={user} createdDate={createdDate} number={1000} />)
    expect(context.find('div.signer').length).to.equal(1)
  })

  it('renders the correct number (legacy only)', () => {
    if (process.env.THEME === 'giraffe') return

    const context = mount(<SignatureListItem user={user} createdDate={createdDate} number={1000} />)
    expect(context.find('.signer-number').text()).to.equal('1000')
  })

  it('renders name', () => {
    const context = mount(<SignatureListItem user={user} createdDate={createdDate} number={1000} />)
    expect(context.text()).to.contain(user.name)
  })

  it('renders readable text with city and state', () => {
    const context = mount(<SignatureListItem user={user} createdDate={createdDate} number={1000} />)
    expect(context.text()).to.contain('Ada Lovelace from Nottingham, England')
  })

  it('renders the date', () => {
    const context = mount(<SignatureListItem user={user} createdDate={createdDate} number={1000} />)
    expect(context.text()).to.contain('Dec 10, 1836')
  })

  it('renders readable text with only state', () => {
    const noCity = {
      state: 'England',
      name: 'Ada Lovelace'
    }
    const context = mount(<SignatureListItem user={noCity} createdDate={createdDate} number={1000} />)
    expect(context.text()).to.contain('Ada Lovelace from England')
  })

  it('renders readable text with no location', () => {
    const noLocation = {
      state: null,
      city: null,
      name: 'Ada Lovelace'
    }
    const context = mount(<SignatureListItem user={noLocation} createdDate={createdDate} number={1000} />)
    expect(context.text()).to.match(/Ada Lovelace ( ?signed this petition on )?Dec 10, 1836/)
    // matches giraffe and legacy theme (with extra space on legacy)
  })
})
