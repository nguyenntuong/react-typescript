import { put, takeEvery } from 'redux-saga/effects';
import { changeId, doSomeAsyncOperator } from './actions';
function* doAsyncOperator(action: ReturnType<typeof doSomeAsyncOperator>) {
    yield put(changeId(action.payload.id));
}
export default function* saga() {
    yield takeEvery(doSomeAsyncOperator.type, doAsyncOperator);
}
