/* eslint-disable camelcase */
import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class CobrandLogo extends React.Component {
  renderLogo() {
    const { cobrand } = this.props
    return (
      <img
        className='org_logo'
        src={cobrand.logo_image_url}
        alt={`${cobrand.organization} logo`}
      />
    )
  }

  render() {
    const { cobrand } = this.props
    // Don’t render if org has no logo
    if (!cobrand || !cobrand.logo_image_url) return null

    return this.renderLogo()
  }
}

const getCobrandFromPetition = (petition = {}) => {
  // grab the sponsor / creator properties from _embedded if it exists
  const { _embedded: { sponsor, creator } = {} } = petition
  const branding = sponsor || creator
  if (!branding) return null

  const { organization_logo_image_url, organization } = branding

  return {
    logo_image_url: organization_logo_image_url, // format of the org api
    organization
  }
}

const mapStateToProps = ({ navStore, petitionStore }, { params }) => {
  let cobrand

  // Will be present we are at an org url (mega-partner)
  const orgName = params && params.organization

  // Will be present if we are viewing a petition
  const petitionSlug = params && params.petition_slug
  const petition = petitionSlug && petitionStore.petitions[petitionSlug.split('.')[0]]

  if (orgName) {
    // check the url for an organization
    cobrand = navStore.orgs[orgName]
  } else if (petition) {
    // check the currently viewed petition, for non-megapartner orgs
    cobrand = getCobrandFromPetition(petition)
  }
  return { cobrand }
}

CobrandLogo.propTypes = {
  cobrand: PropTypes.object
}

export default withRouter(connect(mapStateToProps)(CobrandLogo))
