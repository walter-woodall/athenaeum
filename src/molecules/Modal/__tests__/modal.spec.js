import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Modal from 'molecules/Modal';

describe('<Modal />', () => {
  let wrapper;
  const callback = sinon.spy();

  beforeEach(() => {
    wrapper = shallow(<Modal contentLabel='Test Modal' />);
  });

  it('renders', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('passes props to ReactModal', () => {
    wrapper.setProps({
      onAfterOpen: callback,
      onRequestClose: callback,
      isOpen: false,
      variant: 'simple'
    });

    expect(wrapper.props().className).to.contain('simple');
    expect(wrapper.props().onAfterOpen).to.equal(callback);
    expect(wrapper.props().onRequestClose).to.equal(callback);
    expect(wrapper.props().isOpen).to.equal(false);
  });

  it('sets additional className prop', () => {
    wrapper.setProps({
      className: 'test'
    });

    expect(wrapper.props().className).to.contain('test');
  });

  it('calls onRequestClose callback when .close is clicked', () => {
    wrapper.setProps({
      onRequestClose: callback,
    });

    wrapper.find('.close').simulate('click');

    expect(callback.called).to.equal(true);
  });
});
