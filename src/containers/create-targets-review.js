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
      targetsLoaded: false,
      load: 10,
      filteredTargets: false
    }

    this.renderTargets = this.renderTargets.bind(this)
    this.renderSelectedTargets = this.renderSelectedTargets.bind(this)
    this.loadMoreTargets = this.loadMoreTargets.bind(this)
    this.renderTargets = this.renderTargets.bind(this)
    this.updateQuery = this.updateQuery.bind(this)
    this.renderCustomTarget = this.renderCustomTarget.bind(this)
  }

  static getDerivedStateFromProps(props) {
    const allTargets = props.items;
    let filteredTargets = allTargets.map((target, i) => {
      // Filter selected targets
      if (!(props.targets.length && props.targets.some(e => e.label === target.label))) {
        // If exists, make lowercase
        let searchText = !props.targetQuery ? false : props.targetQuery.toLowerCase()
        // Filter query
        if (target.label.toLowerCase().indexOf(searchText) != -1 || !searchText) {
          return (
            <label className={cx("checkbox-wrap col-12 review-hidden", props.theme === 'ppp'? "bg-ice-blue" : "bg-white")} key={i} onClick={props.onTargetAdd(target, false)}>
              <span>
                {target.label}
              </span>
              <input name={target.value} id={'review-' + target.value}  type="checkbox" title={target.value} />
              <span className="checkmark" />
            </label>
          )
        } else {
          return
        }
      }
    })

    filteredTargets = filteredTargets.filter( target => !!target )

    return {
      allTargets,
      filteredTargets
    }
  }

  updateQuery(event) {
    this.renderTargets();
    this.setState({load: 10});
    let u = this.props.updateStateFromValue('targetQuery');
    u(event);
  }
  renderTargets() {
    if (!this.state.filteredTargets) return;
    let filterIndex = 1
    return this.state.filteredTargets.map((target, i) => {
      if (filterIndex < this.state.load) {
        filterIndex++;
        return target;
      }
    })
  }
  renderSelectedTargets() {
    if (this.props.targets.length) {
      return this.props.targets.map((target, i) => {
        return (
          <div className="col-6 selection-pill" key={i}>
            <div className="pill-inner bg-ice-blue black">
              {target.name}
              <div className="close bg-azure" onClick={this.props.onTargetRemove(target)}>
                <span className="bg-white" />
                <span className="bg-white" />
              </div>
            </div>
          </div>
        )
      })
    }
  }
  renderCustomTarget() {
    if(this.props.targetQuery && this.state.filteredTargets.length === 0) {
      return (
        <div className="add-target bg-ice-blue" onClick={this.props.onTargetAdd({target_type: 'custom', name: this.props.targetQuery, email: '', title: ''}, { isCustom: true })}>
          Add “{this.props.targetQuery}” as your target
          <div className="add"><AddSvg /></div>
        </div>
      )
    } else {
      return
    }
  }

  loadMoreTargets() {
    this.setState(prevState => {
      let newLoad = prevState.load + 10;
      return { load: newLoad }
    })
    this.renderTargets();
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
        targetQuery={this.props.targetQuery}
        updateQuery={this.updateQuery}
        load={this.state.load}
        filteredTargets={this.state.filteredTargets}
        loadMoreTargets={this.loadMoreTargets}
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
