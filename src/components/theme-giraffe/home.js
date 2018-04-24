import React from 'react'
import PropTypes from 'prop-types'

import SearchBar from '../../containers/searchbar'
import TopPetitions from '../../containers/top-petitions'

import BillBoard from 'Theme/billboard'
import Victories from '../../containers/victories'

export const Home = ({ isPac }) => (
  <div className='container home mb-5'>
    <div className='row'>
      <BillBoard className='col-12 mt-4 mt-md-5 mb-3' />
    </div>
    <SearchBar className='home-search' isLong />
    <div className='row pt-1'>
      <TopPetitions
        pac={isPac}
        className='col-12 col-md-7 mt-4'
        source='petitionshomepage'
      />
      <Victories className='col-12 col-md-5 mt-4' />
    </div>
  </div>
)

Home.propTypes = {
  isPac: PropTypes.bool
}
