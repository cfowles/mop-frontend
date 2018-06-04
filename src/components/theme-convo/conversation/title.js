import React from 'react'
import PropTypes from 'prop-types'

const Title = ({titleOnChange}) => (
  <div>
    <div className='bubble'>Excellent. First, what would you like the title of your petition to be?
    </div>
    <div className='bubble'>Great titles should be brief, like a newspaper headline. 🗞️ For example “Mayor Jones: Save Dewey Elementary School”
    </div>
    <div className='bubble user'>
      <input
        type='text'
        name='title'
        placeholder='Your petition title'
        onChange={titleOnChange}
        onBlur={titleOnChange}
      />
    </div>
  </div>
)

Title.propTypes = {
  titleOnChange: PropTypes.func,
  titleValidationError: PropTypes.element
}

export default Title
