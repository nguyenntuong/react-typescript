import { shallow } from 'enzyme';
import Simple from '..';
describe('<Simple />', () => {
    it('Render match snapshot', () => {
        const com = shallow(<Simple />);
        expect(com.html()).toMatchSnapshot();
    });
});
