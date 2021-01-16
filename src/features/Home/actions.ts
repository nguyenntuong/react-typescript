import { createAction } from '@reduxjs/toolkit';
import { CHANGE_ID, DO_SOME_ASYNC_OPERATOR } from './constants';

export const changeId = createAction<string>(CHANGE_ID);
export const doSomeAsyncOperator = createAction<{
    id: string;
}>(DO_SOME_ASYNC_OPERATOR);
