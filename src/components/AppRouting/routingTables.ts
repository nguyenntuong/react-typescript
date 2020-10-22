import { FunctionComponentElement } from 'react';
import Home from 'containers/Home/lazy';
import { REDUCER_SAGA_IDENTIFY } from 'containers/Home/constants';
export const ROUTING_TABLES: {
    key: string;
    path: string;
    exact: boolean;
    component: <P>(props: P) => FunctionComponentElement<P>;
}[] = [
    {
        key: REDUCER_SAGA_IDENTIFY,
        path: '/',
        exact: true,
        component: Home,
    },
];
