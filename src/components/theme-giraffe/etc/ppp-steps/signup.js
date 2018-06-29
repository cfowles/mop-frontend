import React from 'react'
import PropTypes from 'prop-types'
import { devLocalRegister } from '../../../../actions/accountActions';
import CreateRegister from '../../../../containers/create-register-form';
import cx from "classnames";
import RegisterForm from '../../../../containers/register-form'

const Signup = ({
    afterSignup,
    step,
    toggleOpen,
    updateStateFromValue,
    signupModalToggled,
    user,
    email,
    zip,
    name,
    password,
    passwordConfirm,
    registerSubmit
}) => {
    return (
        <div className={cx(
            signupModalToggled ? "signup-modal toggled" : "signup-modal"
        )}>
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
                        successCallback={afterSignup}
                        user={user}
                        includeZipAndPhone
                        useLaunchButton
                        useAlternateFields
                        email={email}
                        zip={zip}
                        name={name}
                        password={password}
                        passwordConfirm={passwordConfirm}
                        registerSubmit
                        updateStateFromValue={updateStateFromValue}
                        />
                    </div>
                    <div className="col-12">
                        <a onClick={user.existing = true}>Already have an account? Click to Log In</a>
                    </div>
                </div>
            </div>

        </div>
    )
}

Signup.propTypes = {
    afterSignup: PropTypes.func,
    toggleOpen: PropTypes.func,
    updateStateFromValue: PropTypes.func,
    user: PropTypes.object,
    onSubmit: PropTypes.func
}

export default Signup

// disabled={!email || !zip || zip.length !== 5 || !name || !password || !passwordConfirm || passwordConfirm !== password} >
