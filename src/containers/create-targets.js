import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadTargets } from '../actions/createPetitionActions'

import Targets from '../components/theme-giraffe/etc/ppp-steps/targets'
import NationalTargetSelect from 'LegacyTheme/form/target-select/national'
import StateTargetSelect from 'LegacyTheme/form/target-select/state'
import CustomTargetSelect from '../components/theme-legacy/form/target-select/custom'
import cx from "classnames";

export class CreateTargets extends React.Component {
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
                <label className={cx("checkbox-wrap col-12")} key={i} onClick={this.props.onTargetAdd(target, false)}>
                    <span>
                        {target.label}
                    </span>
                    <input name={target.value} id={target.value} className="bg-ice-blue" type="checkbox" title={target.value} />
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
    <Targets
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

CreateTargets.propTypes = {
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
