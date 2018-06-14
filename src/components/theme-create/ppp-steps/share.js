import React from 'react'
import PropTypes from 'prop-types'

const Share = ({
    toggleOpen,
    shareButtonsToggled,
    step
}) => {
    const shareButtons = (
        <div className="col-12 share-btns-extra">
            <button type="button" className="xl300 center display-block ppp-share-btn" value="Tweet to Friends" name="share-twitter" id="share-twitter" >
                Tweet to Friends
            </button>
            <button type="button" className="xl300 center display-block ppp-share-btn" value="Copy Link" name="share-link" id="share-link" >
                Copy Link
            </button>
            <button type="button" className="xl300 center display-block ppp-share-btn" value="Facebook Messenger" name="share-messenger" id="share-messenger" >
                Facebook Messenger
            </button>
        </div>
    );

    const output = shareButtonsToggled ? shareButtons : '';
    const classes = step === 6 ? "share ppp-step container active" : "share ppp-step container";

    return (
        <div className={classes}>
            <div className="row ppp-item">
                <div className="col-12">
                    <p>Getting to 10 signatures makes your petition visible to the MoveOn.org community.</p>
                </div>
                <div className="col-12 share-btns-main">
                    <button type="button" className="xl300 center display-block ppp-share-btn" value="Share on Facebook" name="share-facebook" id="share-facebook" >
                        Share on Facebook
                    </button>
                    <button type="button" className="xl300 center display-block ppp-share-btn" value="Email Friends" name="share-email" id="share-email" >
                        Email Friends
                    </button>
                </div>
                <div className="share-btns-extra-wrap container">
                    <div className="col-12 ppp-heading " onClick={toggleOpen('shareButtonsToggled')}>
                        <h3>More Share Options</h3>
                        <div className="share-arrow" >
                            ^
                        </div>
                    </div>
                    {output}
                </div>
            </div>
        </div>
    )
}

Share.propTypes = {
    toggleOpen: PropTypes.func
}

export default Share