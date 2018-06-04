import React from 'react'
import PropTypes from 'prop-types'

const PetitionTitle = ({
    toggleOpen,
    updateStateFromValue
}) => (
    <div className="title ppp-step container">

        <div className="row ppp-item">
            <div className="col-12">
                <p>Let’s launch your petition! From Local to National, we want to give your voice a platform to help you create progressive change.  </p>
            </div>
            <div className="col-12 ppp-heading">
                <h3>Petition title</h3>
                <div className="ppp-tip" onClick={toggleOpen('tipModalToggled')}>
                    Tips
                    <span></span>
                </div>
            </div>
            <div className="col-12">
                <p>Start with a petition title - successful titles are brief, like a newspaper headline.</p>
            </div>
            <div className="col-12">
                <input 
                    name="title" 
                    id="title_field" 
                    className="" 
                    type="text" 
                    title="Title" 
                    placeholder="Your petition title" 
                    onChange={updateStateFromValue('title')}
                    onBlur={updateStateFromValue('title')} />
            </div>
        </div>
    </div>
)

PetitionTitle.propTypes = {
    toggleOpen: PropTypes.func,
    updateStateFromValue: PropTypes.func
}

export default PetitionTitle