import Home from 'features/Home';
import React, { memo } from 'react';
import { Route, Switch } from 'react-router';

function Routing(): React.FunctionComponentElement<{}> {
    return (
        <Switch>
            <Route path="*" component={Home} />
        </Switch>
    );
}

export default memo(Routing);
