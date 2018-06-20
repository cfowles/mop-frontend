import React from 'react'
import PropTypes from 'prop-types'

const Review = ({
    toggleOpen,
    editPetition,
    updateStateFromValue,
    title,
    statement,
    background,
    step,
    nextStep
}) => {

    const review = {
        title: (
            <h3 className="bg-azure black">{title}</h3>
        ),
        statement: (
            <p>{statement}</p>
        ),
        background: (
            <p>{background}</p>
        ),
        edit: (
            <div className="ppp-tip bg-ice-blue" onClick={toggleOpen('editPetition')}>Edit
                <span className="bg-white"></span>
            </div>
        )
    }
    const edit = {
        title: (
            <input
                name="title"
                id="title_field"
                className="bg-ice-blue"
                type="text"
                title="Title"
                value={title}
                onChange={updateStateFromValue('title')}
                onBlur={updateStateFromValue('title')}
            />
        ),
        statement: (
            <textarea
                rows="1"
                name="statement"
                id="statement_field"
                className="bg-ice-blue"
                title="Petition statement"
                value={statement}
                onChange={updateStateFromValue('statement')}
                onBlur={updateStateFromValue('statement')}
            />
        ),
        background: (
            <textarea
                rows="1"
                name="background"
                id="background_field"
                className="bg-ice-blue"
                type="text"
                title="Petition background"
                value={background}
                onChange={updateStateFromValue('background')}
                onBlur={updateStateFromValue('background')}
            />
        ),
        edit: (
            <div className="ppp-tip bg-ice-blue" onClick={toggleOpen('editPetition')}>Save
                <span className="bg-white"></span>
            </div>
        )
    }

    const classes = step === 5 ? "review ppp-step container active" : "review ppp-step container";

    return (
        <div className={classes}>
            <div className="row ppp-item">
                <div className="col-12 ppp-heading">
                    <h3 className="bg-azure black">Review your petition</h3>
                    {editPetition ? edit.edit : review.edit}
                </div>
                <div className="petition-title col-12">
                    {editPetition ? edit.title : review.title}
                </div>
                <div className="petition-targets col-12">
                    <p>To be delivered to <span>The United States House of Representatives</span> and <span>Utah Senate</span>.</p>
                </div>
                {/*
                <div className="petition-image col-12">
                    <div className="image-wrap"></div>
                </div>
                */}
                <div className="petition-statement col-12">
                    <h4>Statement</h4>
                    {editPetition ? edit.statement : review.statement}
                </div>
                <div className="petition-background col-12">
                    <h4>Background</h4>
                    {editPetition ? edit.background : review.background}
                </div>
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
