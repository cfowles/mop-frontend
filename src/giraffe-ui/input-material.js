import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Textarea from "react-textarea-autosize";

export const InputMaterial = ({
  name,
  type,
  className,
  placeholder,
  helperText,
  charLimit,
  stateRef,
  onChange,
  ...rest
}) => (
    <div className="col-12 group">
      <Textarea
        type={type}
        name={name}
        id={name}
        className={cx(
          className,
          stateRef ? 'has-input' : ''
        )}
        onChange={onChange}
        onBlur={onChange}
        {...rest}
      />
      <span className="bar"></span>
      <label>{placeholder}</label>
      {
        (!helperText && charLimit && <small className={cx("helper-text", stateRef.length > charLimit ? 'invalid' : '')}>{stateRef.length ? stateRef.length : '0'}/{charLimit} Characters</small>)
        ||
        (helperText && !charLimit && <small className="helper-text">{helperText}</small>)
      }
    </div>
  )
// const helperClasses = titleLength > 50 ? 'helper-text invalid' : 'helper-text';

InputMaterial.defaultProps = { type: 'text' }

InputMaterial.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
}
