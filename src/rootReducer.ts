import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { history } from 'utils/history';
export default function createReducer(injectedReducers = {}) {
    const rootReducer = combineReducers<any, AnyAction | any>({
        ...injectedReducers,
        router: connectRouter(history),
    });
    return rootReducer;
}
export type RootState = ReturnType<typeof createReducer>;
