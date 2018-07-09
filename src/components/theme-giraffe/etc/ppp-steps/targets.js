import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { InputMaterial } from "GiraffeUI/input-material";
import Lightbulb from '../../../../giraffe-ui/svgs/lightbulb.svg'


const Targets = ({
	toggleOpen,
	nextStep,
	renderTargets,
	renderSelectedTargets,
	targetsLoaded,
	updateStateFromValue,
	getStateValue,
	loadMoreTargets,
	filteredTargets,
	load,
	updateQuery,
	renderCustomTarget
}) => {
	const classes = getStateValue('step') === 4 ? "targets ppp-step container active" : "targets ppp-step container";

	const loadMoreButton = (
		<div className="col-12">
			<button type="button" className="xl300 center display-block btn bg-gray" name="load-more" id="load-more" onClick={loadMoreTargets}>Show More Suggestions</button>
		</div>
	)

	return (
		<div className={classes}>
			<div className="row ppp-item">
				<div className="col-12 ppp-heading">
					<h3>Decision-maker</h3>
					<div className="ppp-tip bg-ice-blue" onClick={toggleOpen("tipModalToggled")}>
						Tips
						<span className="bg-white"><Lightbulb /></span>
					</div>
				</div>
				<div className="col-12">
					<p>
						The decision-maker for your petition is the person or group that has the power to make your change. Let’s find the best decision-maker(s) for your petition.
					</p>
				</div>
				<div className="selection-pills col-12">
					<div className="row">
						{renderSelectedTargets()}
					</div>
				</div>
				<InputMaterial
					name="target-query"
					type="search"
					className="bg-ice-blue"
					label="Search a specific target"
					stateRef={getStateValue('targetQuery')}
					onChange={updateQuery} />
				{!targetsLoaded ? 'Loading...' : ''}
				{renderTargets()}
				{load < filteredTargets.length ? loadMoreButton : ''}
				<div className="col-12">
					{renderCustomTarget()}
				</div>
			</div>
			<button type="button" className="xl300 center display-block ppp-btn btn azure" value="Preview The Petition" name="targets_next" id="targets_next" onClick={nextStep} disabled={!getStateValue('target')}>
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
