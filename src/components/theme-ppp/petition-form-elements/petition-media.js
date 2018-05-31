import React from 'react'
import PropTypes from 'prop-types'

const PetitionMedia = ({
    toggleTipModal,
    tipModalActive
}) => (
    <div className="step5 ppp-step container">
        <div className="row ppp-item">
            <div className="col-12 ppp-heading">
                <h3>Add a photo or video</h3>
                <div className="ppp-tip" onClick={toggleTipModal()}>Tips
                    <span></span>
                </div>
            </div>
            <div className="col-12">
                <p>Petitions with photos or video are more likely to be shared.</p>
            </div>
            <div className="col-12">
                <div className="upload-block">
                    <div className="icon"></div>
                    <div>upload photo or video</div>
                </div>
            </div>
            <div className="col-12 skip-upload">
                <a>Skip for now ></a>
            </div>
        </div>
    </div>
)

PetitionMedia.propTypes = {
    toggleTipModal: PropTypes.func
}

export default PetitionMedia