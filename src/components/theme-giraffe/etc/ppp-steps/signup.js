import React from 'react'
import PropTypes from 'prop-types'
import { devLocalRegister } from '../../../../actions/accountActions';
import CreateRegister from '../../../../containers/create-register-form';

const Statement = ({
    nextStep,
    step,
    toggleOpen,
    updateStateFromValue,
    signupModalToggled,
    user,
    email,
    zip,
    name,
    password,
    confirmPassword,
    registerSubmit
}) => {
    const emailClasses = email ? 'bg-white has-input' : 'bg-white'
    const zipClasses = zip ? 'bg-white has-input' : 'bg-white'
    const nameClasses = name ? 'bg-white has-input' : 'bg-white'
    const passwordClasses = password ? 'bg-white has-input' : 'bg-white'
    const confirmPasswordClasses = confirmPassword ? 'bg-white has-input' : 'bg-white'
    const classes = signupModalToggled ? "signup-modal toggled" : "signup-modal";

    return (
        <div className={classes}>
            <div className="container bg-azure">
                <div className="close" onClick={toggleOpen('signupModalToggled')}>
                    <span className="bg-black"></span>
                    <span className="bg-black"></span>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h2 className="bg-black white">Your petition is important. Let’s make sure you don’t lose progress.</h2>
                        <p>Provide your email and Zip code to recover an incomplete petition draft and receive location specific suggestions to help you throughout your petition creation process.</p>
                    </div>
                    <div className="col-12">
                      <CreateRegister
                        successCallback={nextStep}
                        user={user}
                        includeZipAndPhone
                        useLaunchButton
                        useAlternateFields
                        />
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
                    <div className="col-12 group">
                        <input
                            name="name"
                            id="name_field"
                            className={nameClasses}
                            type="text"
                            title="name"
                            onChange={updateStateFromValue('name')}
                            onBlur={updateStateFromValue('name')} />
                        <span className="bar"></span>
                        <label>Name</label>
                    </div>
                    <div className="col-12 group">
                        <input
                            name="password"
                            id="password_field"
                            className={passwordClasses}
                            type="password"
                            title="password" />
                        <span className="bar"></span>
                        <label>Password</label>
                    </div>
                    <div className="col-12 group">
                        <input
                            name="confirm"
                            id="confirm_field"
                            className={confirmPasswordClasses}
                            type="password"
                            title="confirm" />
                        <span className="bar"></span>
                        <label>Confirm Password</label>
                    </div>
                    <div className="col-12">
                        <a>Already have an account? Click to Log In</a>
                    </div>
                    <div className="col-12">
                        <button
                            type="submit"
                            className="center display-block ppp-btn btn"
                            value="Preview The Petition"
                            name="signup_next"
                            id="signup_next"
                            onClick={nextStep()}
                            >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Statement.propTypes = {
    nextStep: PropTypes.func,
    toggleOpen: PropTypes.func,
    updateStateFromValue: PropTypes.func,
    user: PropTypes.object,
    onSubmit: PropTypes.func
}

export default Statement

// disabled={!email || !zip || zip.length !== 5 || !name || !password || !confirmPassword || confirmPassword !== password} >
