import 'enzyme';
import React from 'react';
import { shallow } from 'enzyme';
import SiderBar from '../index';
describe('<SiderBar />', () => {
    it('renders and should match snapshot', () => {
        const component = shallow(<SiderBar />);
        expect(component).toMatchSnapshot();
    });
});
