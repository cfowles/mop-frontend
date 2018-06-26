import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { InputMaterial } from "GiraffeUI/input-material";
import Close from '../../../../giraffe-ui/svgs/Close.svg'

const Targets = ({
	toggleOpen,
	step,
	nextStep,
	setRef,
	setSelected,
	targets,
	renderTargets,
	renderSelectedTargets,
	targetsLoaded,
	updateStateFromValue,
	loadMoreTargets,
	filteredTargets,
	// filterTargets, 
	load,
	updateQuery,
	targetQuery
}) => {
	const classes = step === 4 ? "targets ppp-step container active" : "targets ppp-step container";

	const loadMoreButton = (
		<div className="col-12">
			<button type="button" className="xl300 center display-block btn bg-gray" name="load-more" id="load-more" onClick={loadMoreTargets}>Show More Suggestions</button>
		</div>
	)

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
				<InputMaterial 
					name="target-query" 
					type="text" 
					className="bg-ice-blue" 
					placeholder="Search a specific target" 
					stateRef={targetQuery} 
					onChange={updateQuery} />
				{!targetsLoaded ? 'Loading...' : ''}
				{renderTargets()}
				{load < filteredTargets.length ? loadMoreButton : ''}
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
