import React from 'react'
import PropTypes from 'prop-types'

const Statement = ({
    nextStep,
    step,
    toggleOpen,
    updateStateFromValue,
    signupModalToggled,
    email,
    zip
}) => {
    const emailClasses = email ? 'bg-white has-input' : 'bg-white'
    const zipClasses = zip ? 'bg-white has-input' : 'bg-white'

    const signup = (
        <div className="row">
            <div className="col-12">
                <h2 className="bg-black white">Your petition is important. Let’s make sure you don’t lose progress.</h2>
                <p>Provide your email and Zip code to recover an incomplete petition draft and receive location specific suggestions to help you throughout your petition creation process.</p>
            </div>
            <div className="col-12 group">
                <input 
                    name="email" 
                    id="email_field" 
                    className={emailClasses}
                    type="email" 
                    title="Email" 
                    onChange={updateStateFromValue('email')}
                    onBlur={updateStateFromValue('email')} 
                    required />
                <span className="bar"></span>
                <label>Email</label>
            </div>
            <div className="col-12 group">
                <input 
                    name="zip" 
                    id="zip_field" 
                    className={zipClasses}
                    type="number" 
                    title="Zip" 
                    onChange={updateStateFromValue('zip')}
                    onBlur={updateStateFromValue('zip')} 
                    required />
                <span className="bar"></span>
                <label>Zip</label>
            </div>
            <div className="col-12">
                <button type="button" 
                className="xl300 center display-block ppp-btn btn" 
                value="Preview The Petition" 
                name="signup_next" 
                id="signup_next" 
                onClick={nextStep()}
                disabled={!email || !zip || zip.length !== 5} >
                Next</button>
            </div>
            <div className="col-12">
                <a>Already have an account? Click to Log In</a>
            </div>
        </div>
    );

    const complete = (
        <div className="row">
            <div className="col-12">
                <h2 className="bg-black white">Complete your account to publish this petition.</h2>
                <p>You can edit, manage, and share your petition from your account dashboard.</p>
            </div>
            <div className="col-12">
                <input 
                    name="name" 
                    id="name_field" 
                    className="bg-white" 
                    type="text" 
                    title="name" 
                    onChange={updateStateFromValue('name')}
                    onBlur={updateStateFromValue('name')} />
                <span className="bar"></span>
                <label>Name</label>
            </div>
            <div className="col-12">
                <input 
                    name="password" 
                    id="password_field" 
                    className="bg-white" 
                    type="password" 
                    title="password" />
                <span className="bar"></span>
                <label>Password</label>
            </div>
            <div className="col-12">
                <input 
                    name="confirm" 
                    id="confirm_field" 
                    className="bg-white" 
                    type="password" 
                    title="confirm" />
                <span className="bar"></span>
                <label>Confirm Password</label>
            </div>
            <div className="col-12">
                <button type="button" className="xl300 center display-block ppp-btn btn" value="Preview The Petition" name="submit_button_complete" id="submit_button_complete" onClick={nextStep()}>Publish</button>
            </div>
        </div>
    );

    const output = step === 1 ? signup : complete;
    const classes = signupModalToggled ? "signup-modal toggled" : "signup-modal";
    
    return (
        <div className={classes}>
            <div className="container bg-azure">
                <div className="close" onClick={toggleOpen('signupModalToggled')}>
                    <span className="bg-black"></span>
                    <span className="bg-black"></span>
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