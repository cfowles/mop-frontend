import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadTargets } from '../actions/createPetitionActions'

import ReviewTargets from '../components/theme-giraffe/etc/ppp-steps/review-targets'
import NationalTargetSelect from 'LegacyTheme/form/target-select/national'
import StateTargetSelect from 'LegacyTheme/form/target-select/state'
import CustomTargetSelect from '../components/theme-legacy/form/target-select/custom'
import cx from "classnames";

export class CreateTargetsReview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nationalOpen: false,
      geoState: null,
      stateOpen: false,
      customOpen: false,
      targetsLoaded: false
    }

    // this.toggleOpen = this.toggleOpen.bind(this)
    // this.renderNational = this.renderNational.bind(this)
    // this.renderGeoState = this.renderGeoState.bind(this)
    // this.renderCustom = this.renderCustom.bind(this)
    this.renderTargets = this.renderTargets.bind(this)
    this.renderSelectedTargets = this.renderSelectedTargets.bind(this)
  }

  static getDerivedStateFromProps(props) {
    const allTargets = props.items;

    return {
      allTargets
    }
  }

  componentDidMount() {
    // Preload congress for autocomplete
    this.props.dispatch(loadTargets('national')).then(()=>{
        this.setState({ targetsLoaded: true })
    })

    // Handle if we need to preload a geoState
    if (this.state.stateTargets && this.state.stateTargets.length) {
      this.props.dispatch(
        loadTargets('state', this.state.stateTargets[0].target_id)
      )
    }
  }

  renderTargets() {
    if (!this.state.targetsLoaded) return null;

    return this.state.allTargets.map((target, i)=>{
        if (!(this.props.targets.length && this.props.targets.some(e => e.label === target.label))) {
            return (
                <label className={cx("checkbox-wrap col-12 review-hidden")} key={i} onClick={this.props.onTargetAdd(target, false)}>
                    <span>
                        {target.label}
                    </span>
                    <input name={target.value} id={this.props.step === 4 ? "review" + target.value : target.value } className="bg-ice-blue" type="checkbox" title={target.value} />
                    <span className="checkmark" />
                </label>
            )
        }
    })
  }
  renderSelectedTargets() {
      return this.props.targets.map((target, i)=>{
          return (
            <div className="col-6 selection-pill" key={i}>
                <div className="pill-inner bg-ice-blue black">
                    {target.label}
                    <div className="close bg-azure" onClick={this.props.onTargetRemove(target)}>
                        <span className="bg-white" />
                        <span className="bg-white" />
                    </div>
                </div>
            </div>
          )
      })
  }




  render() {
    const { setSelected, setRef } = this.props

    return (
    <ReviewTargets
        setSelected={setSelected}
        setRef={setRef}
        step={this.props.step}
        nextStep={this.props.nextStep}
        toggleOpen={this.props.toggleOpen}
        renderTargets={this.renderTargets}
        renderSelectedTargets={this.renderSelectedTargets}
    />
    )
  }
}

CreateTargetsReview.propTypes = {
  setSelected: PropTypes.func,
  setRef: PropTypes.func,
  onTargetAdd: PropTypes.func,
  onTargetRemove: PropTypes.func,
  dispatch: PropTypes.func,
  // eslint-disable-next-line
  targets: PropTypes.array,
  customInputs: PropTypes.object,
  onChangeCustomInputs: PropTypes.func
}
function mapStateToProps(store) {
    return {
      items:
        (store.petitionTargetsStore && store.petitionTargetsStore.national) || []
    }
  }
export default connect(mapStateToProps)(CreateTargetsReview)
