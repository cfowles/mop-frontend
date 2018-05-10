import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SignatureListItemComponent from 'Theme/signature-list-item'

import { flagComment } from '../actions/petitionActions'

class SignatureListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      flagged: false
    }
  }

  flagComment(commentId) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Flag this comment as inappropriate?')) {
      this.props.dispatch(flagComment(commentId))
      this.setState({ flagged: true })
    }
  }

  render() {
    const { user, createdDate, commentId, comments, number } = this.props
    const { city, state } = this.props.user
    const location = ((!city) ? state : `${city}, ${state}`)
    const fromLocation = ((location === '') ? '' : `from ${location}`)

    return (
      <SignatureListItemComponent
        user={user}
        number={number}
        fromLocation={fromLocation}
        date={new Date(createdDate)}
        isFlagged={this.state.flagged}
        onFlag={() => this.flagComment(commentId)}
        comments={comments}
      />
    )
  }
}

SignatureListItem.propTypes = {
  user: PropTypes.shape({
    city: PropTypes.string,
    state: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  createdDate: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  comments: PropTypes.string,
  commentId: PropTypes.number,
  dispatch: PropTypes.func
}

export default connect()(SignatureListItem)
export const WrappedComponent = SignatureListItem
