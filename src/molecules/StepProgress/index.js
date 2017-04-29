import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from 'atoms/Icon';
import TextComponent from 'atoms/TextComponent';

import styles from './step-progress.module.scss';

function renderStep(step, idx) {
  const stepClassNames = [ styles.step ];

  if (step.current) stepClassNames.push(styles['step-current']);
  if (step.inactive) stepClassNames.push(styles['step-inactive']);
  if (step.complete) stepClassNames.push(styles['step-complete']);

  return (
    <li key={`step-${idx}`} className={classnames(...stepClassNames)}>
      <a className={styles['wrapper']} href={step.link}>
        <span className={styles['icon-wrapper']}>
          <Icon icon={step.icon} className={styles['icon']} />
          { step.complete && <Icon icon='checkMark' className={styles['check']} /> }
        </span>
        <TextComponent tag='span' className={styles.label}>{step.label}</TextComponent>
      </a>
    </li>
  );
}

function StepProgress( props ) {
  const {
    steps,
    className
  } = props;

  return (
    <ul className={classnames(styles.stepProgress, className)}>
      { steps.map(renderStep) }
    </ul>
  );
}

StepProgress.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      current: PropTypes.bool,
      complete: PropTypes.bool,
      inactive: PropTypes.bool,
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      link: PropTypes.string
    })
  ),

  /**
   * adds class name to class set
   */
  className: PropTypes.string
};

export default StepProgress;