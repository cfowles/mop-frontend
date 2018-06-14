import React from 'react'
import PropTypes from 'prop-types'

const Statement = ({
    nextStep,
    step,
    toggleOpen,
    updateStateFromValue,
    signupModalToggled
}) => {
    const signup = (
        <div className="row">
            <div className="col-12">
                <h2>Your petition is important. Let’s make sure you don’t lose progress.</h2>
                <p>Provide your email and Zip code to recover an incomplete petition draft and receive location specific suggestions to help you throughout your petition creation process.</p>
            </div>
            <div className="col-12">
                <input 
                    name="email" 
                    id="email_field" 
                    className="" 
                    type="email" 
                    title="Email" 
                    placeholder="Email"
                    onChange={updateStateFromValue('email')}
                    onBlur={updateStateFromValue('email')} />
            </div>
            <div className="col-12">
                <input 
                    name="zip" 
                    id="zip_field" 
                    className="" 
                    type="number" 
                    title="Zip" 
                    placeholder="Zip" 
                    onChange={updateStateFromValue('zip')}
                    onBlur={updateStateFromValue('zip')} />
            </div>
            <div className="col-12">
                <button type="button" className="xl300 center display-block ppp-btn" value="Preview The Petition" name="submit_button_signup" id="submit_button_signup" onClick={nextStep()}>Next</button>
            </div>
            <div className="col-12">
                <a>Already have an account? Click to Log In</a>
            </div>
        </div>
    );

    const complete = (
        <div className="row">
            <div className="col-12">
                <h2>Complete your account to publish this petition.</h2>
                <p>You can edit, manage, and share your petition from your account dashboard.</p>
            </div>
            <div className="col-12">
                <input 
                    name="name" 
                    id="name_field" 
                    className="" 
                    type="text" 
                    title="name" 
                    placeholder="Name" 
                    onChange={updateStateFromValue('name')}
                    onBlur={updateStateFromValue('name')} />
            </div>
            <div className="col-12">
                <input name="password" id="password_field" className="" type="password" title="password" placeholder="Password" />
            </div>
            <div className="col-12">
                <input name="confirm" id="confirm_field" className="" type="password" title="confirm" placeholder="Confirm Password" />
            </div>
            <div className="col-12">
                <button type="button" className="xl300 center display-block ppp-btn" value="Preview The Petition" name="submit_button_complete" id="submit_button_complete" onClick={nextStep()}>Publish</button>
            </div>
        </div>
    );

    const output = step === 2 ? signup : complete;
    const classes = signupModalToggled ? "signup-modal toggled" : "signup-modal";

    return (
        <div className={classes}>
            <div className="container">
                <div className="close" onClick={toggleOpen('signupModalToggled')}>
                    <span></span>
                    <span></span>
                </div>
                {output}
            </div>
        </div>
    )
}

Statement.propTypes = {
    nextStep: PropTypes.func,
    toggleOpen: PropTypes.func,
    updateStateFromValue: PropTypes.func
}

export default Statement