import { Reducer } from 'react';
import { compose } from 'redux';
import { injectReducer, injectSaga } from 'redux-injectors';
import { Saga } from 'redux-saga';

export function withReducerSaga<ComponentType = any>(key: string, reducer: Reducer<any, any>, saga: Saga<any[]>) {
    const withReducer = injectReducer({ key, reducer });
    const withSaga = injectSaga({ key, saga });
    return compose<ComponentType>(withReducer, withSaga);
}
