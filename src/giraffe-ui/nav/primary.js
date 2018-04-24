import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import CaretDownSvg from '../svgs/caret-down.svg'

const baseCn = 'mo-nav__primary'
export const Primary = ({ openSections, toggleSection, children }) => (
  <ul className={baseCn}>
    {React.Children.map(children, child =>
      // Cloning each child is the only way to apply props that were passed into the parent
      React.cloneElement(child, { openSections, toggleSection })
    )}
  </ul>
)

Primary.propTypes = {
  openSections: PropTypes.array.isRequired,
  toggleSection: PropTypes.func.isRequired,
  children: PropTypes.node
}

const Section = ({ openSections, toggleSection, name, children }) => {
  const dropdownCn = section =>
    cn('mo-nav__dropdown', {
      'nav__dropdown--expanded': openSections.indexOf(section) !== -1
    })

  return (
    <li className={dropdownCn(name)}>
      <a onClick={toggleSection(name)}>
        {name}
        <button className={`${baseCn}__caret`}>
          <CaretDownSvg />
        </button>
      </a>

      <ul className={`${baseCn}__subnav`}>{children}</ul>
    </li>
  )
}

Primary.Section = Section

Section.propTypes = {
  openSections: PropTypes.array,
  toggleSection: PropTypes.func,
  name: PropTypes.string,
  children: PropTypes.node
}
