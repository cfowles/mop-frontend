import React from 'react'
import PropTypes from 'prop-types'
import { InputMaterial } from "GiraffeUI/input-material";
import CreateTargetsReview from '../../../../containers/create-targets-review'
import cx from 'classnames'
import Lightbulb from '../../../../giraffe-ui/svgs/lightbulb.svg'
import Edit from '../../../../giraffe-ui/svgs/edit.svg'
import Check from '../../../../giraffe-ui/svgs/check.svg'

const Review = ({
    toggleOpen,
    editPetition,
    updateStateFromValue,
    title,
    summary,
    description,
    step,
    nextStep,
    tipModalToggled,

    // Targets
    selected,
    setSelected,
    setRef,
    targets,
    onTargetAdd,
    onTargetRemove,
    customInputs,
    onChangeCustomInputs,
    targetQuery,
    theme
}) => {

    const targetsArray = [
        <span key="0">To be delivered to </span>
    ];
    if (targets.length) {
        targets.map(function(target, i){
            if(targets.length === 1) {
                targetsArray.push(<span className="target" key={i + 1}>{target.label}<span className="no-underline">.</span></span>);
            } else if (targets.length < 4) {
                if (i < targets.length - 1) targetsArray.push(<span className="target" key={i + 1}>{target.label}<span className="no-underline">,&nbsp;</span></span>);
                if (i === targets.length - 1) targetsArray.push(<span className="target" key={i + 1}><span className="no-underline">and&nbsp;</span>{target.label}<span className="no-underline">.</span></span>)
            } else if (targets.length >= 4) {
                if (i < 3) targetsArray.push(<span className="target" key={i + 1}>{target.label}<span className="no-underline">,&nbsp;</span></span>);
                if (i === 3) targetsArray.push(<span className="target" key={i + 1}><span className="no-underline">and&nbsp;</span>{targets.length - (i)} more<span className="no-underline">.</span></span>);
                if (i > 3) return;
            }
        })
    }

    const review = {
        title: (
            <div className="petition-title col-12">
                <h3 className="bg-azure black">{title}</h3>
            </div>
        ),
        targets: (
            <div className="petition-targets col-12">
                <p>{targetsArray}</p>
            </div>
        ),
        summary: (
            <div className="petition-summary col-12">
                <h4>Statement</h4>
                <p>{summary}</p>
            </div>
        ),
        description: (
            <div className="petition-description col-12">
                <h4>Background</h4>
                <p>{description}</p>
            </div>
        ),
        edit: (
            <div className="ppp-tip bg-off-white" onClick={toggleOpen('editPetition')}>Edit
                <span className="bg-azure"><Edit /></span>
            </div>
        )
    }
    const edit = {
        title: (
            <InputMaterial name="title" type="textarea" className="bg-ice-blue" label="Your Petition Title" charLimit={50} stateRef={title} onChange={updateStateFromValue("title")} />
        ),
        summary: (
            <InputMaterial name="summary" type="textarea" className="bg-ice-blue" label="Your Petition Statement" charLimit={100} stateRef={summary} onChange={updateStateFromValue("summary")} />
        ),
        description: (
            <InputMaterial name="description" type="textarea" className="bg-ice-blue" label="Your Petition Description" charLimit={500} stateRef={description} onChange={updateStateFromValue("description")} />
        ),
        edit: (
            <div className="ppp-tip bg-off-white" onClick={toggleOpen('editPetition')}>Save
                <span className="bg-azure"><Check /></span>
            </div>
        )
    }

    const classes = step === 5 ? "review ppp-step container active" : "review ppp-step container";

    return (
        <div className={classes}>
            <div className="row ppp-item">
                <div className="col-12 ppp-heading">
                    <h3 className="black">Review your petition</h3>
                    {editPetition ? edit.edit : review.edit}
                </div>

                {editPetition ? edit.title : review.title}
                {!editPetition ? review.targets : ''}
                <div className={cx("review-targets-wrap container", editPetition ? "toggled" : '')}>
                    <CreateTargetsReview 
                        tipModalToggled={tipModalToggled}
                        toggleOpen={toggleOpen}
                        updateStateFromValue={updateStateFromValue}
                        step={step}
                        nextStep={nextStep}
                        
                        setSelected={setSelected}
                        setRef={setRef}
                        targets={targets}
                        onTargetAdd={onTargetAdd}
                        onTargetRemove={onTargetRemove}
                        customInputs={customInputs}
                        targetQuery={targetQuery}
                        onChangeCustomInputs={onChangeCustomInputs} />
                </div>
                {editPetition ? edit.summary : review.summary}
                {editPetition ? edit.description : review.description}

            </div>
            <button
                type="button"
                className="xl300 center display-block ppp-btn btn azure"
                value="Preview The Petition"
                name="review_next"
                id="review_next"
                onClick={nextStep}>
                Publish
            </button>
        </div>
    )
}

Review.propTypes = {
    toggleOpen: PropTypes.func,
    updateStateFromValue: PropTypes.func,
    nextStep: PropTypes.func
}

export default Review
