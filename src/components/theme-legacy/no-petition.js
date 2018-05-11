import React from 'react'
import { Link } from 'react-router'

export const NoPetition = () => (
  <div className='container background-moveon-white bump-top-1'>
    <h2 className='legend'>Start your campaign</h2>
    <p>You don’t have any petitions yet.</p>
    <p>
      <Link
        className='button background-moveon-bright-red'
        to='/create_start.html?source=dashboard'
      >
        Start a petition
      </Link>
    </p>
  </div>
)

export default NoPetition
