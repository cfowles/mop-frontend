/* eslint-disable react/sort-comp */
import React from 'react'
import PropTypes from 'prop-types'
import BurgerSvg from '../svgs/burger.svg'

export const MoNavContext = React.createContext()

export class Header extends React.Component {
  toggleOpen = () =>
    this.setState(state => ({ isOpenMobile: !state.isOpenMobile }))

  toggleSection = name => () => {
    this.setState(state => {
      let newArr = state.openSections
      if (newArr.indexOf(name) === -1) newArr.push(name)
      else newArr = newArr.filter(section => section !== name)

      return { openSections: newArr }
    })
  }

  close = () => this.setState({ isOpenMobile: false })

  state = {
    isOpenMobile: false,
    openSections: [],
    toggleOpen: this.toggleOpen,
    toggleSection: this.toggleSection,
    close: this.close
  }

  render() {
    return (
      <MoNavContext.Provider value={this.state}>
        <header id='main-header' className='header'>
          <div className='mo-container'>
            {this.props.children}
            <button onClick={this.state.toggleOpen} className='mo-nav__toggle'>
              <BurgerSvg />
            </button>
          </div>
        </header>
      </MoNavContext.Provider>
    )
  }
}

Header.propTypes = {
  toggleOpen: PropTypes.func,
  children: PropTypes.node
}
