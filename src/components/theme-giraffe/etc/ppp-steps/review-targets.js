import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ReviewTargets = ({
    toggleOpen,
    step,
    nextStep,
    setRef,
    setSelected,
    targets,
    renderTargets,
    renderSelectedTargets
}) => (
    <div className="review-targets container">
        <div className="selection-pills">
            <div className="row">
                {renderSelectedTargets()}
            </div>
        </div>
        <div className="group">
            <input name="search" id="search_field" className="bg-ice-blue" type="text" title="Decision Maker Search" />
            <span className="bar" />
            <label>Search a specific target</label>
        </div>
    </div>
);

ReviewTargets.propTypes = {
    toggleOpen: PropTypes.func,
    nextStep: PropTypes.func
};

export default ReviewTargets;
