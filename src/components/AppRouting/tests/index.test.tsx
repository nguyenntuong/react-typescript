import 'enzyme';
import React from 'react';
import { shallow } from 'enzyme';
import AppRouting from '../index';
describe('<AppRouting />', () => {
    it('renders and should match snapshot', () => {
        const component = shallow(<AppRouting />);
        expect(component).toMatchSnapshot();
    });
});
