import React from 'react'
import PropTypes from 'prop-types'
import Blurb from '../../containers/blurb'

const HotPetitions = ({ topPetitions, className, source }) => (
  <div className={className}>
    <div className='border-bottom border-black'>
      <h3>
        HOT PETITIONS
      </h3>
    </div>
    {topPetitions &&
      topPetitions.map(petition => (
        <Blurb
          key={petition.petition_id}
          petition={petition}
          source={source}
        />
      ))}
  </div>
)

HotPetitions.propTypes = {
  topPetitions: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  className: PropTypes.string,
  source: PropTypes.string
}

export default HotPetitions
