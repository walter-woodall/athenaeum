import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from 'atoms/Icon';
import Modal from 'molecules/Modal';
import styles from './tooltip.module.scss';

class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    (window.innerWidth <= 768) && this.setState({
      modalIsOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  render() {
    const {
      children,
      className,
      left,
      right,
      onClick,
      text,
      hoverMessageClassName,
      inline,
      tooltipIconSize,
    } = this.props;

    return (
      <span>
        <span
          onClick={onClick || this.openModal}
          className={classnames(
            styles['tooltip-wrapper'],
            inline && styles[`inline-${inline}`],
            className
          )}
        >
          {
            text ||
              <Icon
                icon='tooltip'
                className={styles['tooltip']}
                inline={inline}
                height={`${tooltipIconSize}px`}
                width={`${tooltipIconSize}px`}
              />
          }
          <span
            className={classnames(
              children && styles['hover-message'],
              left && styles['left'],
              right && styles['right'],
              hoverMessageClassName
            )}
          >
            { children }
          </span>
        </span>
        <Modal
          header='Learn more'
          onRequestClose={this.closeModal}
          isOpen={this.state.modalIsOpen}
          contentLabel=''
        >
          {children}
        </Modal>
      </span>

    );
  }
}


Tooltip.propTypes = {

  /**
   * This prop will add a new className to any inherent classNames
   * provided in the component's index.js file.
   */
  className: PropTypes.string,

  /**
   * render left-side variant
   */
  left: PropTypes.bool,

  /**
   * render right-side variant
   */
  right: PropTypes.bool,
  /**
   * onClick will override the default `openModal` click handler
   */
  onClick: PropTypes.func,
  /**
   * defaults to a question mark Icon
   */
  text: PropTypes.node,
  /**
   * className for the hover message
   */
  hoverMessageClassName: PropTypes.string,

  /**
   * adds margin to left or right when Tooltip is inline
   */
  inline: PropTypes.oneOf([
    'left', 'right',
  ]),

  /**
   * Changes height and width of default Tooltip icon. Provide a pixel amount as a number (without the units)
   */
  tooltipIconSize: PropTypes.number,
};

Tooltip.defaultProps = {
  tooltipIconSize: 12,
};

export default Tooltip;
