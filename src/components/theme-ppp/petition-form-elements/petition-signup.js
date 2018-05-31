import React from 'react'

const PetitionStatement = () => (
    <div className="signup-modal container">
        <div className="close">
            <span></span>
            <span></span>
        </div>
        <div className="row">
            <div className="col-12">
                <h2>Your petition is important. Let’s make sure you don’t lose progress.</h2>
                <p>Provide your email and Zip code to recover an incomplete petition draft and receive location specific suggestions to help you throughout your petition creation process.</p>
            </div>
            <div className="col-12">
                <input name="email" id="email_field" className="" type="email" title="Email" placeholder="Email" />
            </div>
            <div className="col-12">
                <input name="zip" id="zip_field" className="" type="number" title="Zip" placeholder="Zip" />
            </div>
            <div className="col-12">
                <button type="button" className="xl300 center display-block ppp-btn" value="Preview The Petition" name="submit_button" id="submit_button">Next</button>
            </div>
            <div className="col-12">
                <a>Already have an account? Click to Log In</a>
            </div>
        </div>
    </div>
)

export default PetitionStatement