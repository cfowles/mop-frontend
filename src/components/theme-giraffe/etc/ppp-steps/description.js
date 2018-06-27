import React from 'react'
import PropTypes from 'prop-types'
import { InputMaterial } from "GiraffeUI/input-material";
import cx from "classnames";

const Description = ({
    toggleOpen,
    updateStateFromValue,
    step,
    description,
    nextStep
}) => (
        <div className={cx(
            "description", "ppp-step", "container", step === 3 ? "active" : ""
        )}>
            <div className="row ppp-item">
                <div className="col-12 ppp-heading">
                    <h3>Petition Background</h3>
                    <div className="ppp-tip bg-ice-blue" onClick={toggleOpen('tipModalToggled')}>
                        Tips
                        <span className="bg-white"></span>
                    </div>
                </div>
                <div className="col-12">
                    <p>Briefly describe why this issue is important, and how it’s affected you.</p>
                </div>
                <InputMaterial name="description" type="textarea" className="bg-ice-blue" label="Your Petition Description" charLimit={500} stateRef={description} onChange={updateStateFromValue("description")} />
            </div>
            <button
                type="button"
                className="center display-block ppp-btn btn azure"
                name="description_next"
                id="description_next"
                onClick={nextStep}
                disabled={!description || description.length > 500} >
                Next
            </button>
        </div>
    )


Description.propTypes = {
    toggleOpen: PropTypes.func,
    updateStateFromValue: PropTypes.func,
    nextStep: PropTypes.func
}

export default Description
