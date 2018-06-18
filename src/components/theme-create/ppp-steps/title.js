import React from 'react'
import PropTypes from 'prop-types'
import Textarea from "react-textarea-autosize";

const Title = ({
    toggleOpen,
    updateStateFromValue,
    step,
    title
}) => {
    const classes = step == 1 ? "title ppp-step container active" : "title ppp-step container";
    const inputClasses = title ? 'bg-ice-blue has-input' : 'bg-ice-blue'
    const titleLength = title.length;
    const helperClasses = titleLength > 50 ? 'helper-text invalid' : 'helper-text';

    return (
        <div className={classes} >
            <div className="row ppp-item">
                <div className="col-12">
                    <p>Let’s launch your petition! From Local to National, we want to give your voice a platform to help you create progressive change.  </p>
                </div>
                <div className="col-12 ppp-heading">
                    <h3>Petition title</h3>
                    <div className="ppp-tip bg-ice-blue" onClick={toggleOpen('tipModalToggled')}>
                        Tips
                    <span className="bg-white"></span>
                    </div>
                </div>
                <div className="col-12">
                    <p>Start with a petition title - successful titles are brief, like a newspaper headline.</p>
                </div>
                <div className="col-12 group">
                    <Textarea
                        name="title"
                        id="title_field"
                        className={inputClasses}
                        type="text"
                        title="Title"
                        onChange={updateStateFromValue('title')}
                        onBlur={updateStateFromValue('title')} 
                        required />
                    <span className="bar"></span>
                    <label>Your petition title</label>
                    <small className={helperClasses}>{titleLength ? titleLength : '0'}/50 Characters</small>
                </div>
            </div>
            <button 
                type="button" 
                className="xl300 center display-block ppp-btn btn azure" 
                value="Preview The Petition" 
                name="title_next" 
                id="title_next" 
                onClick={toggleOpen('signupModalToggled')}
                disabled={!title || titleLength > 50}>
                Next
            </button>
        </div>
    )
}

Title.propTypes = {
    toggleOpen: PropTypes.func,
    updateStateFromValue: PropTypes.func
}

export default Title