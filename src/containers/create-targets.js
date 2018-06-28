import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadTargets } from '../actions/createPetitionActions'

import Targets from '../components/theme-giraffe/etc/ppp-steps/targets'
import ConvoTargets from '../components/theme-giraffe/etc/conversation/targets'
import NationalTargetSelect from 'LegacyTheme/form/target-select/national'
import StateTargetSelect from 'LegacyTheme/form/target-select/state'
import CustomTargetSelect from '../components/theme-legacy/form/target-select/custom'
import cx from "classnames";

import AddSvg from '../giraffe-ui/svgs/add.svg'

export class CreateTargets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nationalOpen: false,
      geoState: null,
      stateOpen: false,
      customOpen: false,
      targetsLoaded: false,
      // query: false,
      load: 10,
      filteredTargets: false
    }

    // this.toggleOpen = this.toggleOpen.bind(this)
    // this.renderNational = this.renderNational.bind(this)
    // this.renderGeoState = this.renderGeoState.bind(this)
    // this.renderCustom = this.renderCustom.bind(this)
    this.renderTargets = this.renderTargets.bind(this)
    this.renderSelectedTargets = this.renderSelectedTargets.bind(this)
    this.loadMoreTargets = this.loadMoreTargets.bind(this)
    // this.filterTargets = this.filterTargets.bind(this)
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
        let searchText = props.targetQuery == false ? false : props.targetQuery.toLowerCase()
        // Filter query
        if (target.label.toLowerCase().indexOf(searchText) != -1 || !searchText) {
          return (
            <label className={cx("checkbox-wrap col-12 review-hidden", props.theme === 'ppp'? "bg-ice-blue" : "bg-white")} key={i} onClick={props.onTargetAdd(target, false)}>
              <span>
                {target.label}
              </span>
              <input name={target.value} id={props.step === 4 ? "review" + target.value : target.value}  type="checkbox" title={target.value} />
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

  componentDidMount() {
    // Preload congress for autocomplete
    this.props.dispatch(loadTargets('national')).then(() => {
      this.setState({ targetsLoaded: true })
    })

    // Handle if we need to preload a geoState
    if (this.state.stateTargets && this.state.stateTargets.length) {
      this.props.dispatch(
        loadTargets('state', this.state.stateTargets[0].target_id)
      )
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
    const { setSelected, setRef, theme } = this.props

    if (theme === 'ppp') {
      return (
        <Targets
          setSelected={setSelected}
          setRef={setRef}
          step={this.props.step}
          nextStep={this.props.nextStep}
          toggleOpen={this.props.toggleOpen}
          renderTargets={this.renderTargets}
          // filterTargets={this.filterTargets}
          renderSelectedTargets={this.renderSelectedTargets}
          renderCustomTarget={this.renderCustomTarget}
          targetsLoaded={this.state.targetsLoaded}
          load={this.state.load}
          loadMoreTargets={this.loadMoreTargets}
          updateStateFromValue={this.props.updateStateFromValue}
          filteredTargets={this.state.filteredTargets}
          updateQuery={this.updateQuery}
          targetQuery={this.props.targetQuery}
          onTargetAdd={this.props.onTargetAdd}
        />
      )
    } else {
      return (
        <ConvoTargets
          setSelected={setSelected}
          setRef={setRef}
          step={this.props.step}
          nextStep={this.props.nextStep}
          toggleOpen={this.props.toggleOpen}
          renderTargets={this.renderTargets}
          // filterTargets={this.filterTargets}
          renderSelectedTargets={this.renderSelectedTargets}
          renderCustomTarget={this.renderCustomTarget}
          targetsLoaded={this.state.targetsLoaded}
          load={this.state.load}
          loadMoreTargets={this.loadMoreTargets}
          updateStateFromValue={this.props.updateStateFromValue}
          filteredTargets={this.state.filteredTargets}
          updateQuery={this.updateQuery}
          targetQuery={this.props.targetQuery}
          onTargetAdd={this.props.onTargetAdd}
          section={this.props.section}
          currentBubble={this.props.currentBubble}
        />
      )
    }
  }
}

CreateTargets.propTypes = {
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
export default connect(mapStateToProps)(CreateTargets)

// OLD
//
// import React from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

// import { loadTargets } from '../actions/createPetitionActions'

// import Targets from '../components/theme-giraffe/etc/ppp-steps/targets'
// import NationalTargetSelect from 'LegacyTheme/form/target-select/national'
// import StateTargetSelect from 'LegacyTheme/form/target-select/state'
// import CustomTargetSelect from '../components/theme-legacy/form/target-select/custom'

// export class CreateTargets extends React.Component {
//   constructor(props) {

//     super(props)
//     this.state = {
//       nationalOpen: false,
//       geoState: null,
//       stateOpen: false,
//       customOpen: false
//     }

//     this.toggleOpen = this.toggleOpen.bind(this)
//     this.renderNational = this.renderNational.bind(this)
//     this.renderGeoState = this.renderGeoState.bind(this)
//     this.renderCustom = this.renderCustom.bind(this)
//   }

//   static getDerivedStateFromProps(props) {
//     console.log(props)
//     const customTargets = props.targets.filter(t => t.target_type === 'custom')
//     const nationalTargets = props.targets.filter(
//       target =>
//         ['senatemem', 'housemem', 'president', 'house', 'senate'].indexOf(
//           target.target_type
//         ) !== -1
//     )
//     const stateTargets = props.targets.filter(
//       target =>
//         [
//           'statesenatemem',
//           'statehousemem',
//           'governor',
//           'statehouse',
//           'statesenate'
//         ].indexOf(target.target_type) !== -1
//     )

//     const openCheckboxes = {}
//     if (nationalTargets.length) openCheckboxes.nationalOpen = true
//     if (stateTargets.length) openCheckboxes.stateOpen = true
//     if (customTargets.length) openCheckboxes.customOpen = true

//     return {
//       nationalTargets,
//       stateTargets,
//       customTargets,
//       ...openCheckboxes
//     }
//   }

//   componentDidMount() {
//     // Preload congress for autocomplete
//     this.props.dispatch(loadTargets('national')).then(()=>{
//         console.log('targets loaded')
//     })

//     // Handle if we need to preload a geoState
//     if (this.state.stateTargets && this.state.stateTargets.length) {
//       this.props.dispatch(
//         loadTargets('state', this.state.stateTargets[0].target_id)
//       )
//     }
//   }

//   toggleOpen(key) {
//     return () => this.setState(prev => ({ [key]: !prev[key] }))
//   }

//   renderNational() {
//     if (!this.state.nationalOpen) return null
//     console.log(this.state);
//     return (
//       <NationalTargetSelect
//         selected={this.state.nationalTargets}
//         remove={this.props.onTargetRemove}
//         onSelect={this.props.onTargetAdd}
//       />
//     )
//   }

//   renderGeoState() {
//     if (!this.state.stateOpen) return null
//     return (
//       <StateTargetSelect
//         geoState={this.state.geoState}
//         selected={this.state.stateTargets}
//         remove={this.props.onTargetRemove}
//         onSelect={this.props.onTargetAdd}
//         onChangeGeoState={event => {
//           const { value } = event.target
//           this.props.dispatch(loadTargets('state', value))
//           this.setState({ geoState: value })
//         }}
//       />
//     )
//   }

//   renderCustom() {
//     const { customOpen } = this.state
//     if (!customOpen) return null
//     return (
//       <CustomTargetSelect
//         selected={this.state.customTargets}
//         remove={this.props.onTargetRemove}
//         onSelect={target => {
//           this.props.onTargetAdd(target, { isCustom: true })
//         }}
//         customInputs={this.props.customInputs}
//         onChangeInputs={this.props.onChangeCustomInputs}
//       />
//     )
//   }

//   render() {
//     const { setSelected, setRef } = this.props

//     return (
//     <Targets
//         setSelected={setSelected}
//         setRef={setRef}
//         renderNational={this.renderNational}
//         renderGeoState={this.renderGeoState}
//         renderCustom={this.renderCustom}
//         toggleOpen={this.toggleOpen}
//         nationalOpen={this.state.nationalOpen}
//         stateOpen={this.state.stateOpen}
//         customOpen={this.state.customOpen}
//         step={this.props.step}
//         nextStep={this.props.nextStep}
//     />
//     )
//   }
// }

// CreateTargets.propTypes = {
//   setSelected: PropTypes.func,
//   setRef: PropTypes.func,
//   onTargetAdd: PropTypes.func,
//   onTargetRemove: PropTypes.func,
//   dispatch: PropTypes.func,
//   // eslint-disable-next-line
//   targets: PropTypes.array,
//   customInputs: PropTypes.object,
//   onChangeCustomInputs: PropTypes.func
// }
// function mapStateToProps(store) {
//     return {
//       targets:
//         (store.petitionTargetsStore && store.petitionTargetsStore.national) || []
//     }
//   }
// export default connect(mapStateToProps)(CreateTargets)
