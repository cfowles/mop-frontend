import React from 'react'

export const Loading = () => (
  <div className='moveon-petitions container background-moveon-white bump-top-1'>
    <div className='container'>
      <div className='row'>
        <div className='span12' style={{ height: '300px' }}>
          <p
            style={{
              textAlign: 'center',
              position: 'relative',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          >
            Loading...
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default Loading
