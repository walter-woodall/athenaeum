import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Tooltip from 'atoms/Tooltip';
import ErrorMessage from 'atoms/ErrorMessage';

import { renderOption, renderPlaceholder } from 'utils/fieldUtils';
import styles from './select_field.module.scss';

function renderSelectOptions(options) {
  if (!options) return null;

  return options.map(renderOption);
}

const renderToolTip = (message) => {
  if (!message) return null;

  return (
    <div className={styles['tooltip-wrapper']}>
      <Tooltip right>{ message }</Tooltip>
    </div>
  );
};

function SelectField( props ) {
  const {
    className,
    placeholder,
    label,
    selectOptions,
    forProp,
    type,
    input,
    tooltip,
    defaultValue,
    meta,
  } = props;

  const classes = [
    styles[type],
    meta && meta.active && styles['focused'],
    className,
  ];

  const message = meta && meta.touched && !meta.active && (meta.error || meta.warning);

  return (
    <div>
      <div className={classnames(...classes)}>
        { label &&
          <label className={styles['label']} htmlFor={forProp}>
            { label }
            { renderToolTip(tooltip) }
          </label>
        }

        { defaultValue ?
          <div className={styles['select']}>{defaultValue}</div>
          :
          <div className={styles['select-wrapper']}>
            <select
              className={styles['select']}
              id={forProp}
              required
              {...input}
            >
              { placeholder && renderPlaceholder(placeholder, styles['option'] ) }
              { renderSelectOptions(selectOptions) }
            </select>
          </div>
        }
      </div>

      <ErrorMessage
        condition={!!message}
        message={message}
      />
    </div>
  );
}

SelectField.propTypes = {
  /**
   * Will append new classname to classSet
   */
  className: PropTypes.string,

  /**
   * adds focus state to select field
   */
  focused: PropTypes.bool,

  /**
   * adds for property to label with corresponding id to select field
   */
  forProp: PropTypes.string,

  /**
   * Label is optional. If not provided, component will reorganize accordingly.
   */
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),

  /**
   * placeholder text for select box
   */
  placeholder: PropTypes.string,

  /**
   * array containing objects for select value
   */
  selectOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])
  })),

  /**
   * defines type of select field
   */
  type: PropTypes.string,
  /**
   * contains anything you want to pass directly to input e.g. value, onChange, onBlur
   */
  input: PropTypes.object,
  /**
   * Content for tooltip
   */
  tooltip: PropTypes.node,
  /**
   * Default / non-changeable value
   */
  defaultValue: PropTypes.string,
  /**
   * The props under the meta key are metadata about the state of this field that `redux-form` tracks.
   */
  meta: PropTypes.object,
};

SelectField.defaultProps = {
  type: 'select-field',
  errorMessage: false,
};

export default SelectField;
