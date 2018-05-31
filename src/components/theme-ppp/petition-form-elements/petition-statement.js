import React from 'react'
import PropTypes from 'prop-types'

const PetitionStatement = ({
    toggleTipModal,
    tipModalActive
}) => (
    <div className="step2 ppp-step container">

        <div className="row ppp-item">
            <div className="col-12 ppp-heading">
                <h3>Petition statement</h3>
                <div className="ppp-tip" onClick={toggleTipModal()}>Tips
                    <span></span>
                </div>
            </div>
            <div className="col-12">
                <p>In 1-2 sentences, tell us more about what you want your petition to accomplish.</p>
            </div>
            <div className="col-12">
                <textarea rows="1" name="statement" id="statement_field" className="" title="Petition statement" placeholder="Petition statement" />
            </div>
        </div>
    </div>
)

PetitionStatement.propTypes = {
    toggleTipModal: PropTypes.func
}

export default PetitionStatement