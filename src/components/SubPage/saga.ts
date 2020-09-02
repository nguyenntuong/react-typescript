import { put, takeEvery } from 'redux-saga/effects';

import { SUB_PAGE_REDUCER_KEY } from './constants';

import { GotStringAction, IGetStringAction } from './actions';

function* setString(action: IGetStringAction) {
    yield put(GotStringAction(action.params.id));
}

export default function* saga() {
    yield takeEvery(SUB_PAGE_REDUCER_KEY.SET_STRING, setString);
}
