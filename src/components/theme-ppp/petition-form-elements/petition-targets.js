import React from 'react'
import PropTypes from 'prop-types'

const PetitionTargets = ({
    toggleOpen
}) => (
    <div className="targets ppp-step container">
        <div className = "row ppp-item">
            <div className="col-12 ppp-heading">
                <h3>Decision Makers</h3>
                <div className="ppp-tip" onClick={toggleOpen('tipModalToggled')}>
                    Tips
              <span></span>
                </div>
            </div>
            <div className="col-12">
                <p>The Target of your petition is the person or group that has the decision making power to make this change. Let’s find the best target for your petition.</p>
            </div>
            <div className="selection-pills col-12">
                <div className="row">
                    <div className="col-6 selection-pill">
                        <div className="pill-inner">
                            U.S. House
                            <div className="close">
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 selection-pill">
                        <div className="pill-inner">
                            U.S. Senate
                            <div className="close">
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <input name="search" id="search_field" className="" type="text" title="Decision Maker Search" placeholder="Search a specific target" />
            </div>
            <label className="checkbox-wrap col-12">
                <span><b>The White House</b> | The president</span>
                <input name="president" id="president" className="" type="checkbox" title="president" />
                <span className="checkmark"></span>
            </label>
            <label className="checkbox-wrap col-12">
                <span><b>The U.S.</b> Senate</span>
                <input name="senate" id="senate" className="" type="checkbox" title="senate" />
                <span className="checkmark"></span>
            </label>
            <label className="checkbox-wrap col-12">
                <span><b>The U.S.</b> House of Representatives</span>
                <input name="representatives" id="representatives" className="" type="checkbox" title="representatives" />
                <span className="checkmark"></span>
            </label>
            <label className="checkbox-wrap col-12">
                <span><b>Senate</b> of Utah</span>
                <input name="utah-senate" id="utah-senate" className="" type="checkbox" title="utah-senate" />
                <span className="checkmark"></span>
            </label>
            <div className="col-12">
                <div className="add-target">
                    Add “Deseret News” as target
                    <div className="add"></div>
                </div>
            </div>
        </div>
    </div>
)

PetitionTargets.propTypes = {
    toggleOpen: PropTypes.func
}

export default PetitionTargets