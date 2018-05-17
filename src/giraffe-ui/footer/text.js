import React from 'react'

import CaretRightSvg from '../svgs/caret-right.svg'

export const Text = () => (
  <div className='footer__text'>
    <div className='footer__text__item'>
      A joint website of MoveOn.org Civic Action and MoveOn.org Political
      Action. MoveOn.org Political Action and MoveOn.org Civic Action and are
      separate organizations.
    </div>
    <div className='footer__text__item'>
      <a href='http://civic.moveon.org/'>MoveOn.org Civic Action</a> is a
      501(c)(4) organization which primarily focuses on nonpartisan education
      and advocacy on important national issues.
      <a
        href='https://civic.moveon.org/donatec4/creditcard.html?cpn_id=511'
        className='footer__text__cta'
      >
        Donate to MoveOn Civic Action
        <CaretRightSvg />
      </a>
    </div>
    <div className='footer__text__item'>
      <a href='http://pol.moveon.org/'>MoveOn.org Political Action</a> is a
      federal political committee which primarily helps members elect candidates
      who reflect our values through a variety of activities aimed at
      influencing the outcome of the next election.
      <a
        href='https://act.moveon.org/donate/pac-donation'
        className='footer__text__cta'
      >
        Donate to MoveOn Political Action
        <CaretRightSvg />
      </a>
    </div>
  </div>
)
