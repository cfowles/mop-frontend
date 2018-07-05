import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { InputMaterial } from "GiraffeUI/input-material";
import Close from '../../../../giraffe-ui/svgs/Close.svg'
import cx from 'classnames'

const ConvoTargets = ({
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
	renderCustomTarget,
	saveInput
}) => {
	let currentIndex = getStateValue('currentIndex');

	const loadMoreButton = (
		<div className="col-12">
			<button type="button" className="xl300 center display-block btn bg-gray" name="load-more" id="load-more" onClick={loadMoreTargets}>Show More Suggestions</button>
		</div>
	)

	const customTarget = filteredTargets.length > 0 ? '' : (
			<div className="add-target bg-ice-blue">
				Add “{getStateValue('targetQuery')}” as target
				<div className="add" />
			</div>
	)

	return (
		<div className={cx("targets container bg-azure", currentIndex  === 19 ? 'toggled' : '' )}>
			<div className="row">
				<div className={cx("targets-list", currentIndex === 19 ? 'toggled' : '')}>
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
						stateRef={getStateValue('targetQuery')}
						onChange={updateQuery} />
					<button className="center display-block bg-white azure" onClick={saveInput('target')}>DONE</button>
				</div>
			</div>
		</div>
	);
};

ConvoTargets.propTypes = {
	toggleOpen: PropTypes.func,
};

export default ConvoTargets;