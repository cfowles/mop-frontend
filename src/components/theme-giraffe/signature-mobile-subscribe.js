import React from 'react'
import { InputBlock } from 'GiraffeUI/petition'
import { Link } from 'react-router'

export default class MobileSubscribe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayMobileOptIn: false,
    }
  }

  render() {
    return (
     <div className="mobile">
        <InputBlock
          name='mobile'
          label='Mobile'
          onChange={() => { this.setState({displayMobileOptIn: true})} }
        />

        { !this.state.displayMobileOptIn ? '' : (
          <div className="mobileoptincheckbox">
            <InputBlock
              type='checkbox'
              name='mobilesubscribe_optin'
              label='Receive mobile alerts from MoveOn. Msg & data rates may apply. Text STOP to 668366 to stop receiving messages. Text HELP to 668366 for more information.'
            />
            <Link className="mobileoptinlink" to="#"> Terms & Conditions. </Link>
          </div>
        )}
      </div>
    )
  }
}


// TODO
// mobile field - if filled in, show message
// opt in message
// opt in checkbox should be passed into OSDI record
