import React from 'react'
import PropTypes from 'prop-types'

import { splitIntoSpansJsx } from '../../lib'
import { Card } from 'GiraffeUI/card'
import { Button } from 'GiraffeUI/button'

const Billboard = ({ className }) => (
  <Card
    center
    reducePadding
    className={className}
    heading={<h1>{splitIntoSpansJsx('PEOPLE-POWERED PETITIONS')}</h1>}
  >
    <p className='large'>
      <strong>
        There are millions of MoveOn members. Tap into our shared people power
        and create progressive change.
      </strong>
    </p>
    <Button large linkTo='/create_start.html?source=petitionshomepage'>
      Start a Petition
    </Button>
  </Card>
)

Billboard.propTypes = {
  className: PropTypes.string
}

export default Billboard
