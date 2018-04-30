import React from 'react'
import PropTypes from 'prop-types'

import SignatureListItem from '../../containers/signature-list-item'

const SignatureListPage = ({ signatures, startNumber }) => (
  <div className='signers'>
    {signatures.map(({ user, comments, comment_id: commentId, created_date: createdDate }, index) => (
      <SignatureListItem
        key={commentId}
        number={startNumber + index}
        user={user}
        createdDate={createdDate}
        commentId={commentId}
        comments={comments}
      />
    ))}
  </div>
)

SignatureListPage.propTypes = {
  signatures: PropTypes.arrayOf(PropTypes.object),
  startNumber: PropTypes.number
}

export default SignatureListPage
