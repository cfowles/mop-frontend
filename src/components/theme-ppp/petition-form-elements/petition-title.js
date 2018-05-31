import React from 'react'
import PropTypes from 'prop-types'

const PetitionTitle = ({
    toggleTipModal,
    tipModalActive
}) => (
    <div className="step1 ppp-step container">

        <div className="row ppp-item">
            <div className="col-12">
                <p>Let’s launch your petition! From Local to National, we want to give your voice a platform to help you create progressive change.  </p>
            </div>
            <div className="col-12 ppp-heading">
                <h3>Petition title</h3>
                <div className="ppp-tip" onClick={toggleTipModal()}>
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

PetitionTitle.propTypes = {
    toggleTipModal: PropTypes.func
}

export default PetitionTitle