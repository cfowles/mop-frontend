import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'GiraffeUI/button'
import { Blurb as MoBlurb } from 'GiraffeUI/blurb'

export const Blurb = ({ title, statement, url, by }) => (
  <MoBlurb
    title={title}
    url={url}
    byline={`by ${by}`}
    cta={<Button linkTo={url}>Sign this petition</Button>}
  >
    {statement}
  </MoBlurb>
)

Blurb.propTypes = {
  title: PropTypes.string,
  statement: PropTypes.node,
  url: PropTypes.string,
  by: PropTypes.string
}
