import 'enzyme';
import React from 'react';
import { shallow } from 'enzyme';
import Component from '../index';
describe('<Component />', () => {
    it('renders and should match snapshot', () => {
        const component = shallow(<Component />);
        expect(component).toMatchSnapshot();
    });
});
