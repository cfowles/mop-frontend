import React from 'react'

const PetitionBackground = () => (
    <div className="step3 ppp-step container">
        <div className="row ppp-item">
            <div className="col-12 ppp-heading">
                <h3>Petition Background</h3>
                <div className="ppp-tip">
                    Tips
          <span></span>
                </div>
            </div>
            <div className="col-12">
                <p>Briefly describe why this issue is important, and how it’s affected you.</p>
            </div>
            <div className="col-12">
                <textarea rows="1" name="background" id="background_field" className="" type="text" title="Petition background" placeholder="Petition background" />
            </div>
        </div>
    </div>
)

export default PetitionBackground
