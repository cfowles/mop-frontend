import React from 'react'
import PropTypes from 'prop-types'
import Textarea from "react-textarea-autosize";

const Background = ({
    toggleOpen,
    updateStateFromValue,
    step,
    background,
    nextStep
}) => {
    const classes = step == 3 ? 'background ppp-step container active' : 'background ppp-step container';
    const inputClasses = background ? 'bg-ice-blue has-input' : 'bg-ice-blue'
    const backgroundLength = background.length;
    const helperClasses = backgroundLength >= 500 ? 'helper-text invalid' : 'helper-text';

    return (
        <div className={classes}>
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
                <div className="col-12 group">
                    <Textarea
                        rows="1"
                        name="background"
                        id="background_field"
                        className={inputClasses}
                        type="text"
                        title="Petition background"
                        onChange={updateStateFromValue('background')}
                        onBlur={updateStateFromValue('background')} 
                        required />
                    <span className="bar"></span>
                    <label>Petition Background</label>
                    <small className={helperClasses}>{backgroundLength ? backgroundLength : '0'}/500 Characters</small>
                </div>
            </div>
            <button 
                type="button" 
                className="xl300 center display-block ppp-btn btn azure" 
                value="Preview The Petition" 
                name="background_next" 
                id="background_next" 
                onClick={nextStep()}
                disabled={!background || background > 500} >
                Next
            </button>
        </div>
    )
}

Background.propTypes = {
    toggleOpen: PropTypes.func,
    updateStateFromValue: PropTypes.func,
    nextStep: PropTypes.func
}

export default Background
