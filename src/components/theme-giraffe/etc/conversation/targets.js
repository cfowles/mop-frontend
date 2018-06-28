import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { InputMaterial } from "GiraffeUI/input-material";
import Close from '../../../../giraffe-ui/svgs/Close.svg'
import cx from 'classnames'

const ConvoTargets = ({
	toggleOpen,
	setRef,
	setSelected,
	targets,
	renderTargets,
	renderSelectedTargets,
	targetsLoaded,
	loadMoreTargets,
	filteredTargets,
	// filterTargets,
	load,
	updateQuery,
	targetQuery,
	renderCustomTarget,
	section,
	currentIndex,
	saveInput
}) => {

	const loadMoreButton = (
		<div className="col-12">
			<button type="button" className="xl300 center display-block btn bg-gray" name="load-more" id="load-more" onClick={loadMoreTargets}>Show More Suggestions</button>
		</div>
	)

	const customTarget = filteredTargets.length > 0 ? '' : (
			<div className="add-target bg-ice-blue">
				Add “{targetQuery}” as target
				<div className="add" />
			</div>
	)

	return (
		<div className={cx("targets container bg-azure", currentIndex === 19 ? 'toggled' : '' )}>
			<div className="row">
				<div className={cx("targets-list", currentIndex===19 ? 'toggled' : '')}>
					{renderTargets()}
					{load < filteredTargets.length ? loadMoreButton : ''}
					<div className="col-12">
						{renderCustomTarget()}
					</div>
				</div>
				<div className="search-wrap">
					<InputMaterial
						name="target-query"
						type="search"
						className="bg-white"
						label="Search a specific target"
						stateRef={targetQuery}
						onChange={updateQuery} />
					<button className="center display-block bg-white azure" onClick={saveInput('target')}>DONE</button>
				</div>
			</div>
		</div>
	);
};

ConvoTargets.propTypes = {
	toggleOpen: PropTypes.func,
	nextStep: PropTypes.func
};

export default ConvoTargets;


// <div className="selection-pills col-12">
// <div className="row">
// 	{renderSelectedTargets()}
// </div>
// </div>