import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const Targets = ({
    toggleOpen, 
    step, 
    nextStep, 
    setRef, 
    setSelected, 
    targets,
    renderTargets, 
    renderSelectedTargets 
}) => {
    const classes = step === 4 ? "targets ppp-step container active" : "targets ppp-step container";
 

	return (
		<div className={classes}>
			<div className="row ppp-item">
				<div className="col-12 ppp-heading">
					<h3>Decision Makers</h3>
					<div className="ppp-tip bg-ice-blue" onClick={toggleOpen("tipModalToggled")}>
						Tips
						<span className="bg-white" />
					</div>
				</div>
				<div className="col-12">
					<p>The Target of your petition is the person or group that has the decision making power to make this change. Let’s find the best target for your petition.</p>
				</div>
				<div className="selection-pills col-12">
					<div className="row">
						{renderSelectedTargets()}
					</div>
				</div>
				<div className="col-12 group">
					<input name="search" id="search_field" className="bg-ice-blue" type="text" title="Decision Maker Search" />
					<span className="bar" />
					<label>Search a specific target</label>
				</div>
				{renderTargets()}
				<div className="col-12">
					<div className="add-target bg-ice-blue">
						Add “Deseret News” as target
						<div className="add" />
					</div>
				</div>
			</div>
			<button type="button" className="xl300 center display-block ppp-btn btn azure" value="Preview The Petition" name="targets_next" id="targets_next" onClick={nextStep}>
				Next
			</button>
		</div>
	);
};

Targets.propTypes = {
	toggleOpen: PropTypes.func,
	nextStep: PropTypes.func
};

export default Targets;
