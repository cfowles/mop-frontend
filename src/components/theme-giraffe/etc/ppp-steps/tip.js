import React from 'react'
import PropTypes from 'prop-types'
import { tips } from './tips-data'
import Lightbulb from '../../../../giraffe-ui/svgs/lightbulb.svg'

const Tip = ({
    toggleOpen,
    getStateValue
}) => {
    const currentTip = tips[getStateValue('step') - 1];

    const description = currentTip.description.map(function(paragraph, index){
        return <p key={index}>{paragraph}</p>;
    })
    const examples = currentTip.examples.map(function(example, index){
        let paragraphs = example.map(function(paragraph, subIndex){
            return <p key={subIndex}>{paragraph}</p>
        })
        return (
            <div className="example col-12" key={index}>
                <h3 className="bg-azure">Example #{index + 1}</h3>
                {paragraphs}
            </div>)
    })

    const classes = getStateValue('tipModalToggled') ? "tip-modal container bg-white toggled" : "tip-modal container bg-white";

    return (
        <div className={classes}>
            <div className="close" onClick={toggleOpen('tipModalToggled')}>
                <span className="bg-azure"></span>
                <span className="bg-azure"></span>
            </div>
            <div className="row heading bg-off-white">
                <div className="col-12">
                    <span className="bg-azure"><Lightbulb /></span>
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

Tip.propTypes = {
    toggleOpen: PropTypes.func,
    step: PropTypes.number,
}

export default Tip