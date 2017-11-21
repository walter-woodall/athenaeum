/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Text from 'atoms/Text';
import LinkWrapper from 'atoms/LinkWrapper';

import styles from './submenu_item.module.scss';
import ProductDisplay from '../ProductDisplay';
import MagazineDisplay from '../MagazineDisplay';

class SubmenuItem extends React.Component {
  getMobileClick = (activeName) => {
    const {
      showMobileMenu,
      setMobileCollapsedMenu,
    } = this.props;

    if (showMobileMenu) {
      return (e) => {
        e.stopPropagation();
        setMobileCollapsedMenu(activeName);

        return false;
      };
    }

    return () => true;
  }

  get submenuDisplayType() {
    const {
      displayType,
      item,
      mobileCollapsedMenu,
      setMobileCollapsedMenu,
      activeSubTab,
    } = this.props;

    if (displayType === 'magazine') {
      return (
        <MagazineDisplay
          intro={item.intro}
          activeName={item.menu.activeName}
          isActive={activeSubTab === item.menu.activeName}
          headerText={item.menu.header}
          tag={item.menu.tag}
          mobileCollapsedMenu={mobileCollapsedMenu}
          setMobileCollapsedMenu={setMobileCollapsedMenu}
        />
      );
    }

    if (displayType === 'product') {
      return (
        <ProductDisplay
          intro={item.intro}
          list={item.list}
          headerText={item.menu.header}
          isActive={activeSubTab === item.menu.activeName}
          activeName={item.menu.activeName}
          columns={item.menu.columns}
          mobileCollapsedMenu={mobileCollapsedMenu}
          setMobileCollapsedMenu={setMobileCollapsedMenu}
        />
      );
    }

    return null;
  }

  // onClick needed for tablet devices to open display menu
  tabletOnClick = () => {
    const {
      setActiveSubTab,
      item
    } = this.props;

    return (e) => {
      e.stopPropagation();
      setActiveSubTab(item.menu.activeName);

      return false;
    };
  };

  render() {
    const {
      item: {
        menu
      },
      showMobileMenu,
      displayType,
      activeSubTab,
      activeName,
      setActiveSubTab,
    } = this.props;

    const headerClasses = classnames(
      styles['item-header-text'],
      activeSubTab === menu.activeName && styles.active,
    );

    const linkClasses = classnames(
      styles['item-header-link'],
      // need to add special padding to More link on Tablet
      menu.activeName === 'more' && styles['item-more-link'],
      // need to remove pointer events on tablet for all submenu items
      // except those for 'about', which should still be clickable
      activeName !== 'about' && styles['tablet-no-pointer'],
    );

    return (
      <div
        className={styles.item}
        onClick={this.tabletOnClick()}
        onMouseEnter={() => setActiveSubTab(menu.activeName)}
        onMouseLeave={() => setActiveSubTab(null)}
      >
        <LinkWrapper
          className={linkClasses}
          href={showMobileMenu && displayType ? null : menu.link}
          onClick={this.getMobileClick(menu.activeName)}
        >
          <Text
            type={10}
            font='b'
            color='neutral-1'
            className={classnames(headerClasses, styles['item-long-header'])}
          >
            {menu.header}
          </Text>

          {
            menu.shortHeader &&
              <Text
                type={10}
                font='b'
                color='neutral-1'
                className={classnames(headerClasses, styles['item-short-header'])}
              >
                {menu.shortHeader}
              </Text>
          }
        </LinkWrapper>

        { this.submenuDisplayType }
      </div>
    );
  }
}

SubmenuItem.propTypes = {
  item: PropTypes.object,
  showMobileMenu: PropTypes.bool,
  setMobileCollapsedMenu: PropTypes.func,
  displayType: PropTypes.string,
  setActiveSubTab: PropTypes.func,
  activeSubTab: PropTypes.string,
  mobileCollapsedMenu: PropTypes.string,
  activeName: PropTypes.string,
};

export default SubmenuItem;
