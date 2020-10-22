import React, { FunctionComponentElement } from 'react';
import { Switch, Route } from 'react-router';
import { composeInferTypeMemo } from 'utils/composeInferType';
import ErrorPage from 'components/ErrorPage';

import { ROUTING_TABLES } from './routingTables';
export interface IAppRoutingProps {}

function AppRouting(props: IAppRoutingProps): FunctionComponentElement<IAppRoutingProps> {
    return (
        <Switch>
            {ROUTING_TABLES.map((x) => (
                <Route key={x.key} exact={x.exact} path={x.path} render={() => <x.component {...props} />} />
            ))}
            <Route exact path="*" render={() => <ErrorPage {...props} errorCode="404" />} />
        </Switch>
    );
}
export default composeInferTypeMemo(AppRouting)();
