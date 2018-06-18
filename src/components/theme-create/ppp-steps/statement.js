import React from 'react'
import PropTypes from 'prop-types'
import Textarea from "react-textarea-autosize";

const Statement = ({
    toggleOpen,
    updateStateFromValue,
    step,
    statement,
    nextStep
}) => {
    const classes = step === 2 ? "statement ppp-step container active" : "statement ppp-step container";
    const inputClasses = statement ? 'bg-ice-blue has-input' : 'bg-ice-blue'
    const statementLength = statement.length;
    const helperClasses = statementLength > 100 ? 'helper-text invalid' : 'helper-text';

    return (
        <div className={classes}>
            <div className="row ppp-item">
                <div className="col-12 ppp-heading">
                    <h3>Petition statement</h3>
                    <div className="ppp-tip bg-ice-blue" onClick={toggleOpen('tipModalToggled')}>Tips
                    <span className="bg-white"></span>
                    </div>
                </div>
                <div className="col-12">
                    <p>In 1-2 sentences, tell us more about what you want your petition to accomplish.</p>
                </div>
                <div className="col-12 group">
                    <Textarea 
                        name="statement"
                        id="statement_field"
                        className={inputClasses}
                        title="Petition statement"
                        onChange={updateStateFromValue('statement')}
                        onBlur={updateStateFromValue('statement')} 
                        required />
                    <span className="bar"></span>
                    <label>Petition Statement</label>
                    <small className={helperClasses}>{statementLength ? statementLength : '0'}/100 Characters</small>
                </div>
            </div>
            <button 
                type="button" 
                className="xl300 center display-block ppp-btn btn azure" 
                value="Preview The Petition" 
                name="statement_next" 
                id="statement_next" 
                onClick={nextStep()}
                disabled={!statement || statement > 100} >
                Next
            </button>
        </div>
    )
}

Statement.propTypes = {
    toggleOpen: PropTypes.func,
    updateStateFromValue: PropTypes.func,
    nextStep: PropTypes.func
}

export default Statement