import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'atoms/Layout';
import Button from 'atoms/Button';
import styles from './policy_card.module.scss';

export const PolicyActions = (props) => {
  const { onContinue, continueCTAText, selected } = props;

  return (
    <div className={styles['actions']}>
      <Layout smallCols={[ 12 ]} style={{ width: '100%' }} fullwidth>
        <Button
          onClick={onContinue}
          outline={selected}
        >
          {continueCTAText}
        </Button>
      </Layout>
    </div>
  );
};

PolicyActions.propTypes = {
  onContinue: PropTypes.func.isRequired,
  continueCTAText: PropTypes.string,
  onDetails: PropTypes.func,
  selected: PropTypes.bool,
};

PolicyActions.defaultProps = {
  continueCTAText: 'Continue'
};

export default PolicyActions;
