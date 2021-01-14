import React, { memo } from 'react';
import Layout from './Layout';
import Routing from './Routing';

class App extends React.Component {
    render() {
        return (
            <Layout>
                <Routing />
            </Layout>
        );
    }
}
export default memo(App);
