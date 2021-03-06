import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactModal from 'react-modal';

import Text from 'atoms/Text';
import Icon from 'atoms/Icon';
import MobileMenu from 'molecules/MobileMenu';
import styles from './modal.module.scss';

const wrapChild = (child) => {
  if (child.type === MobileMenu) return child;

  return React.createElement(
    'div',
    {
      className: classnames(
        styles['section'],
      )
    },
    child
  );
};

class Modal extends React.Component {
  componentWillMount() {
    if (typeof document !== 'undefined') {
      ReactModal.setAppElement('body');
    }
  }

  render() {
    const {
      children,
      className,
      contentLabel,
      header,
      hideHeader,
      hideX,
      isOpen,
      onAfterOpen,
      onRequestClose,
      variant
    } = this.props;

    return (
      <ReactModal
        isOpen={isOpen}
        onAfterOpen={onAfterOpen}
        onRequestClose={onRequestClose}
        contentLabel={contentLabel}
        className={classnames(styles['modal'], styles[variant], className)}
        overlayClassName={styles['overlay']}
      >
        <div className={styles['dialog']}>
          <div className={styles['body']}>
            {
              !hideHeader &&
                <div
                  className={styles['header']}
                >
                  <Text
                    type={4}
                    font='a'
                  >
                    {header}
                  </Text>

                  <div
                    className={styles['close-col']}
                  >
                    {
                      !hideX &&
                        <Icon
                          icon='close'
                          className={styles['close']}
                          onClick={onRequestClose}
                        />
                    }
                  </div>
                </div>
            }
            {React.Children.map(children, wrapChild)}
          </div>
        </div>
      </ReactModal>
    );

  }
}


Modal.propTypes = {
  /**
   * This prop will add a new className to any inherent classNames
   * provided in the component's index.js file.
   */
  className: PropTypes.string,

  /**
   * Provides header text for modal
   */
  header: PropTypes.string,

  /**
   * label passed to ReactModal `contentLabel`
   */
  contentLabel: PropTypes.string.isRequired,

  /**
   * Hide the X icon to close the modal
   */
  hideX: PropTypes.bool,

  /**
   * Hide the header section for modal
   */
  hideHeader: PropTypes.bool,

  /**
   * Boolean to determine modal open/closed
   */
  isOpen: PropTypes.bool,

  /**
   * callback passed to ReactModal `onAfterOpen`
   */
  onAfterOpen: PropTypes.func,

  /**
   * callback passed to ReactModal `onRequestClose` and to modal 'X'
   */
  onRequestClose: PropTypes.func,

  /**
   * variant for modal - options are `simple` (default), `large` & `mobile`
   */
  variant: PropTypes.oneOf([ 'simple', 'large', 'x-large', 'mobile', 'mobile-large' ]),
};

Modal.defaultProps = {
  variant: 'simple',
  hideX: false,
  hideHeader: false,
};

export default Modal;
