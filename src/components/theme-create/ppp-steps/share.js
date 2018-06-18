import React from 'react'
import PropTypes from 'prop-types'

const Share = ({
    toggleOpen,
    shareButtonsToggled,
    step
}) => {

    // const output = shareButtonsToggled ? shareButtons : '';
    const classes = step === 6 ? "share ppp-step container active" : "share ppp-step container";
    const shareButtonsClasses = shareButtonsToggled ? 'dropdown-submenu share-btns-extra toggled' : 'dropdown-submenu share-btns-extra';

    return (
        <div className={classes}>
            <div className="row ppp-item">
                <div className="col-12">
                    <p>Getting to 10 signatures makes your petition visible to the MoveOn.org community.</p>
                </div>
                <div className="col-12 share-btns-main">
                    <button href="https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Ffront.moveon.org" target="_blank" aria-label="Share on Facebook" className="share_item__btn flex xl300 btn azure mb-2">
                        <svg>
                            <use xlinkHref="#facebook"></use>
                        </svg>
                        Share on Facebook
                    </button>
                    <button href="mailto:?subject=An%20article%20from%20MoveOn%20&amp;body=http%3A%2F%2Ffront.moveon.org" className="share_item__btn flex xl300 btn azure">
                        <svg>
                            <svg>
                                <use xlinkHref="#mail"></use>
                            </svg>
                        </svg>
                        Email a friend
                    </button>
                </div>
                <div className="container share-btns-extra-wrap">
                    <div className="col-12 bg-off-white py-2" onClick={toggleOpen('shareButtonsToggled')}>
                        <a href="#" className="mo-btn home-illustration__cta btn mt-0">
                            More Share Options
                            <svg>
                                <use xlinkHref="#caret-down" />
                            </svg>
                        </a>
                        <div className={shareButtonsClasses}>
                            <button href="https://twitter.com/intent/tweet/?via=MoveOnOrg" target="_blank" aria-label="Share on Twitter" className="share_item flex xl300 btn">
                                <svg>
                                    <svg>
                                        <use xlinkHref="#twitter"></use>
                                    </svg>
                                </svg>Tweet this
                            </button>
                            <button href="" target="_blank" aria-label="Copy link" className="share_item flex xl300 btn">
                                <svg>
                                    <use xlinkHref="#link"></use>
                                </svg>
                                Copy link
                            </button>
                            <button href="" className="share_item flex xl300 btn">
                                <svg>
                                    <svg>
                                        <use xlinkHref="#mail"></use>
                                    </svg>
                                </svg>
                                Facebook Messenger
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Share.propTypes = {
    toggleOpen: PropTypes.func
}

export default Share