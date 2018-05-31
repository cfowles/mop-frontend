import React from 'react'
import PropTypes from 'prop-types'
import { tips } from './tips-data'

const PetitionTip = ({
    toggleTipModal,
    tipModalActive,
    step
}) => {
    const currentTip = tips[step - 1];
    console.log(currentTip);

    const description = currentTip.description.map(function(paragraph, index){
        return <p key={index}>{paragraph}</p>;
    })
    const examples = currentTip.examples.map(function(example, index){
        let paragraphs = example.map(function(paragraph, subIndex){
            return <p key={subIndex}>{paragraph}</p>
        })
        return (
            <div className="example col-12" key={index}>
                <h3>Example #{index + 1}</h3>
                {paragraphs}
            </div>)
    })

    return (
        <div className="tip-modal container">
            <div className="close" onClick={toggleTipModal()}>
                <span></span>
                <span></span>
            </div>
            <div className="row heading">
                <div className="col-12">
                    <span></span>
                    <h2>{currentTip.title}</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {description}
                </div>
                {examples}
            </div>
        </div>
    )
}

PetitionTip.propTypes = {
    toggleTipModal: PropTypes.func,
    step: PropTypes.number,
}

export default PetitionTip