import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from 'atoms/Icon';
import Text from 'atoms/Text';
import styles from './icon_list.module.scss';

function IconList(props) {
  const {
    className,
    data,
    type,
    font,
  } = props;

  return (
    <ul className={classnames(styles['icon-list'], className)}>
      {
        data.map( (item, idx) =>
          <li
            className={styles['item']}
            key={`iconlist-item-${idx}`}
          >
            <Icon
              className={styles['icon']}
              icon={item.icon}
            />

            <Text
              className={styles['text']}
              type={type}
              font={font}
            >
              {item.text}
            </Text>
          </li>
        )
      }
    </ul>
  );
}


IconList.propTypes = {
  /**
   * This prop will add a new className to any inherent classNames
   * provided in the component's index.js file.
   */
  className: PropTypes.string,
  /**
   * Text type prop -- see [Text](#text) for appropriate values
   */
  type: PropTypes.number,
  /**
   * Font type prop -- see [Text](#text) for appropriate values
   */
  font: PropTypes.string,
  /**
   * List of items to map over to create list
   */
  data: PropTypes.arrayOf(PropTypes.shape({
    item: PropTypes.string,
    icon: PropTypes.string
  })).isRequired,
};

IconList.defaultProps = {
  type: 8,
  font: 'a',
};

export default IconList;
