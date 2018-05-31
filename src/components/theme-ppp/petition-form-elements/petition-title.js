import React from 'react'

const PetitionTitle = () => (
    <div className="step1 ppp-step container">

        {/* Petition title */}
        <div className="row ppp-item">
            <div className="col-12">
                <p>Let’s launch your petition! From Local to National, we want to give your voice a platform to help you create progressive change.  </p>
            </div>
            <div className="col-12 ppp-heading">
                <h3>Petition title</h3>
                <div className="ppp-tip">
                    Tips
                    <span></span>
                </div>
            </div>
            <div className="col-12">
                <p>Start with a petition title - successful titles are brief, like a newspaper headline.</p>
            </div>
            <div className="col-12">
                <input name="title" id="title_field" className="" type="text" title="Title" placeholder="Your petition title" />
            </div>
        </div>
    </div>
)

export default PetitionTitle