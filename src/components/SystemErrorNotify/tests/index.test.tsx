import 'enzyme';
import React from 'react';
import { shallow } from 'enzyme';
import SystemErrorNotify from '../index';
describe('<SystemErrorNotify />', () => {
    it('renders and should match snapshot', () => {
        const component = shallow(<SystemErrorNotify />);
        expect(component).toMatchSnapshot();
    });
});
