import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { MoNavContext } from './header'

import CaretDownSvg from '../svgs/caret-down.svg'

const baseCn = 'mo-nav__primary'
export const Primary = ({ children }) => (
  <ul className={baseCn}>
    {children}
  </ul>
)

Primary.propTypes = { children: PropTypes.node }

const Section = ({ name, children }) => {
  const dropdownCn = (section, openSections) =>
    cn('mo-nav__dropdown', {
      'nav__dropdown--expanded': openSections.indexOf(section) !== -1
    })

  return (
    <MoNavContext.Consumer>
    {({ openSections, toggleSection }) => (
      <li className={dropdownCn(name, openSections)}>
        <a onClick={toggleSection(name)}>
          {name}
          <button className={`${baseCn}__caret`}>
            <CaretDownSvg />
          </button>
        </a>

        <ul className={`${baseCn}__subnav`}>{children}</ul>
      </li>
    )}
    </MoNavContext.Consumer>
  )
}

Primary.Section = Section

Section.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node
}
