import 'enzyme';
import React from 'react';
import { shallow } from 'enzyme';
import ErrorPage from '../index';
describe('<ErrorPage />', () => {
    it('renders and should match snapshot', () => {
        const component = shallow(<ErrorPage />);
        expect(component).toMatchSnapshot();
    });
});
