/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/unbound-method */
import { applyMiddleware } from 'redux';
import { configureStore, getDefaultMiddleware, isPlain } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { createInjectorsEnhancer } from 'redux-injectors';
import createReducer from './rootReducer';
import { History } from 'history';
import { IGlobalState } from 'state';
import { isPlainCustom } from 'utils/reducerMiddleware';
export type AppStore = ReturnType<typeof configureAppStore>;
export default function configureAppStore(history: History, initialState: IGlobalState = {}) {
    let reduxSagaMonitorOptions = {};
    if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
        const windowWithType = window as typeof window & {
            __SAGA_MONITOR_EXTENSION__?: Record<string, unknown>;
        };
        // Dev Tools once it supports redux-saga version 1.x.x
        if (windowWithType.__SAGA_MONITOR_EXTENSION__) {
            reduxSagaMonitorOptions = {
                sagaMonitor: windowWithType.__SAGA_MONITOR_EXTENSION__,
            };
        }
    }
    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
    const { run: runSaga } = sagaMiddleware;
    // sagaMiddleware: Make redux-sagas work
    const middlewares = [sagaMiddleware, routerMiddleware(history)];
    const enhancers = [
        applyMiddleware(...middlewares),
        createInjectorsEnhancer({
            createReducer,
            runSaga,
        }),
    ];
    const store = configureStore({
        reducer: createReducer(),
        middleware: [
            ...getDefaultMiddleware({
                serializableCheck: {
                    isSerializable: (value: any) => {
                        return isPlain(value) || isPlainCustom(value);
                    },
                },
            }),
        ],
        preloadedState: initialState,
        devTools: process.env.NODE_ENV !== 'production',
        enhancers: [...enhancers],
    });
    return store;
}
