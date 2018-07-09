import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadTargets } from '../actions/createPetitionActions'

import Targets from '../components/theme-giraffe/etc/ppp-steps/targets'
import ConvoTargets from '../components/theme-giraffe/etc/conversation/targets'
// import NationalTargetSelect from 'LegacyTheme/form/target-select/national'
// import StateTargetSelect from 'LegacyTheme/form/target-select/state'
// import CustomTargetSelect from '../components/theme-legacy/form/target-select/custom'
import cx from 'classnames'

import AddSvg from '../giraffe-ui/svgs/add.svg'

export class CreateTargets extends React.Component {
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
    const allTargets = props.items
    let filteredTargets = allTargets.map((target, i) => {
      // Filter selected targets
      if (!(props.targets.length && props.targets.some(e => e.label === target.label))) {
        // If exists, make lowercase
        const searchText = props.targetQuery === false ? false : props.targetQuery.toLowerCase()
        // Filter query
        if (target.label.toLowerCase().indexOf(searchText) !== -1 || !searchText) {
          return (
            <label className={cx('checkbox-wrap col-12 review-hidden', props.theme === 'ppp' ? 'bg-ice-blue' : 'bg-white')} key={i} onClick={props.onTargetAdd(target, false)}>
              <span>
                {target.label}
              </span>
              <input name={target.value} id={target.value} type='checkbox' title={target.value} />
              <span className='checkmark' />
            </label>
          )
        }
      }
    })

    filteredTargets = filteredTargets.filter(target => !!target)

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
    // if (this.state.stateTargets && this.state.stateTargets.length) {
    //   this.props.dispatch(
    //     loadTargets('state', this.state.stateTargets[0].target_id)
    //   )
    // }
  }
  updateQuery(event) {
    this.renderTargets()
    this.setState({ load: 10 })
    const u = this.props.updateStateFromValue('targetQuery')
    u(event)
  }

  loadMoreTargets() {
    this.setState(prevState => {
      const newLoad = prevState.load + 10
      return { load: newLoad }
    })
    this.renderTargets()
  }

  renderTargets() {
    if (!this.state.filteredTargets) return
    let filterIndex = 1
    return this.state.filteredTargets.map((target, i) => {
      if (filterIndex < this.state.load) {
        filterIndex++
        return target
      }
    })
  }

  renderSelectedTargets() {
      if (this.props.targets.length) {
        return this.props.targets.map((target, i) => (
          <div className='col-6 selection-pill' key={i}>
            <div className='pill-inner bg-ice-blue black'>
              {target.name}
              <div className='close bg-azure' onClick={this.props.onTargetRemove(target)}>
                <span className='bg-white' />
                <span className='bg-white' />
              </div>
            </div>
          </div>
          ))
      }
    }

  renderCustomTarget() {
      if (this.props.targetQuery && this.state.filteredTargets.length === 0) {
        return (
          <div className='add-target bg-ice-blue' onClick={this.props.onTargetAdd({ target_type: 'custom', name: this.props.targetQuery, email: '', title: '' }, { isCustom: true })}>
            Add “{this.props.targetQuery}” as your target
            <div className='add'><AddSvg /></div>
          </div>
        )
      }
    }

  render() {
    const { setSelected, setRef, theme } = this.props

    if (theme === 'ppp') {
      return (
        <Targets
          nextStep={this.props.nextStep}
          toggleOpen={this.props.toggleOpen}
          renderTargets={this.renderTargets}
          renderSelectedTargets={this.renderSelectedTargets}
          renderCustomTarget={this.renderCustomTarget}
          targetsLoaded={this.state.targetsLoaded}
          load={this.state.load}
          loadMoreTargets={this.loadMoreTargets}
          updateStateFromValue={this.props.updateStateFromValue}
          filteredTargets={this.state.filteredTargets}
          updateQuery={this.updateQuery}
          onTargetAdd={this.props.onTargetAdd}
          getStateValue={this.props.getStateValue}
        />
      )
    }
      return (
        <ConvoTargets
          nextStep={this.props.nextStep}
          toggleOpen={this.props.toggleOpen}
          renderTargets={this.renderTargets}
          renderSelectedTargets={this.renderSelectedTargets}
          renderCustomTarget={this.renderCustomTarget}
          targetsLoaded={this.state.targetsLoaded}
          load={this.state.load}
          loadMoreTargets={this.loadMoreTargets}
          updateStateFromValue={this.props.updateStateFromValue}
          filteredTargets={this.state.filteredTargets}
          updateQuery={this.updateQuery}
          onTargetAdd={this.props.onTargetAdd}
          saveInput={this.props.saveInput}
          getStateValue={this.props.getStateValue}
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
  customInputs: PropTypes.object,
  updateStateFromValue: PropTypes.func
}
function mapStateToProps(store) {
  return {
    items:
      (store.petitionTargetsStore && store.petitionTargetsStore.national) || []
  }
}
export default connect(mapStateToProps)(CreateTargets)
