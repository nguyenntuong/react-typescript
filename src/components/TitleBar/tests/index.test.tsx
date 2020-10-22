import 'enzyme';
import React from 'react';
import { shallow } from 'enzyme';
import TitleBar from '../index';
describe('<TitleBar />', () => {
    it('renders and should match snapshot', () => {
        const component = shallow(<TitleBar />);
        expect(component).toMatchSnapshot();
    });
});
