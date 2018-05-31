import React from 'react'

const PetitionTip = () => (
    <div className="tip-modal container">
        <div className="close">
            <span></span>
            <span></span>
        </div>
        <div className="row heading">
            <div className="col-12">
                <span></span>
                <h2>Petition Title</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <p>Your title should be brief and get people’s attention. Include the change you want to make.</p>
            </div>
            <div className="example col-12">
                <h3>Example #1</h3>
                <p>Mayor Jones: Save Dewey Elementary School.</p>
            </div>
            <div className="example col-12">
                <h3>Example #2</h3>
                <p>Enough is enough. We demand gun control.</p>
            </div>
            <div className="example col-12">
                <h3>Example #3</h3>
                <p>Tell Congress: Restore Net Neutrality before it’s too late!</p>
            </div>
        </div>
    </div>
)

export default PetitionTip