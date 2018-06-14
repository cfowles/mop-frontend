import React from 'react'
import PropTypes from 'prop-types'

import { Blurb } from 'GiraffeUI/blurb'

export const Victories = ({ victories, className }) => (
  <div id='victories' className={className}>
    <div className='border-bottom border-black row no-gutters'>
      <h3 className='col'>VICTORIES</h3>
      <a className='col-auto' href='https://front.moveon.org/category/victories/'>
        +more
      </a>
    </div>

    {victories.map(({ link, image, title, text }) => (
      <Blurb key={link} url={link} image={image} title={title}>
        {text} <a href={link}>(Read More)</a>
      </Blurb>
    ))}
  </div>
)

Victories.propTypes = {
  victories: PropTypes.array,
  className: PropTypes.string
}
