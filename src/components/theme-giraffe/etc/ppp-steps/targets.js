import React from 'react'
import PropTypes from 'prop-types'

const Targets = ({
    toggleOpen,
    step,
    nextStep
}) => {
    const classes = step === 4 ? "targets ppp-step container active" : "targets ppp-step container";

    return (
        <div className={classes}>
            <div className="row ppp-item">
                <div className="col-12 ppp-heading">
                    <h3>Decision Makers</h3>
                    <div className="ppp-tip bg-ice-blue" onClick={toggleOpen('tipModalToggled')}>
                        Tips
                    <span className="bg-white"></span>
                    </div>
                </div>
                <div className="col-12">
                    <p>The Target of your petition is the person or group that has the decision making power to make this change. Let’s find the best target for your petition.</p>
                </div>
                <div className="selection-pills col-12">
                    <div className="row">
                        <div className="col-6 selection-pill">
                            <div className="pill-inner bg-ice-blue black">
                                U.S. House
                            <div className="close bg-azure">
                                    <span className="bg-white"></span>
                                    <span className="bg-white"></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 selection-pill">
                            <div className="pill-inner bg-ice-blue black">
                                U.S. Senate
                            <div className="close bg-azure">
                                    <span className="bg-white"></span>
                                    <span className="bg-white"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 group">
                    <input 
                        name="search" 
                        id="search_field" 
                        className="bg-ice-blue" 
                        type="text" 
                        title="Decision Maker Search" />
                    <span className="bar"></span>
                    <label>Search a specific target</label>
                </div>
                <label className="checkbox-wrap col-12">
                    <span><b>The White House</b> | The president</span>
                    <input name="president" id="president" className="bg-ice-blue" type="checkbox" title="president" />
                    <span className="checkmark"></span>
                </label>
                <label className="checkbox-wrap col-12">
                    <span><b>The U.S.</b> Senate</span>
                    <input name="senate" id="senate" className="bg-ice-blue" type="checkbox" title="senate" />
                    <span className="checkmark"></span>
                </label>
                <label className="checkbox-wrap col-12">
                    <span><b>The U.S.</b> House of Representatives</span>
                    <input name="representatives" id="representatives" className="bg-ice-blue" type="checkbox" title="representatives" />
                    <span className="checkmark"></span>
                </label>
                <label className="checkbox-wrap col-12">
                    <span><b>Senate</b> of Utah</span>
                    <input name="utah-senate" id="utah-senate" className="bg-ice-blue" type="checkbox" title="utah-senate" />
                    <span className="checkmark"></span>
                </label>
                <div className="col-12">
                    <div className="add-target bg-ice-blue">
                        Add “Deseret News” as target
                    <div className="add"></div>
                    </div>
                </div>
            </div>
            <button 
                type="button" 
                className="xl300 center display-block ppp-btn btn azure" 
                value="Preview The Petition" 
                name="targets_next" 
                id="targets_next" 
                onClick={nextStep}>
                Next
            </button>
        </div>
    )
}

Targets.propTypes = {
    toggleOpen: PropTypes.func,
    nextStep: PropTypes.func
}

export default Targets