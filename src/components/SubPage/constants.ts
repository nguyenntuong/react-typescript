import { createReducerSagaIdentify } from 'utils/createReducerSagaIdentify';

export const REDUCER_SAGA_IDENTIFY = createReducerSagaIdentify(module);

enum SUB_PAGE_REDUCER_KEY {
    SET_STRING = 'SUB_PAGE_REDUCER_KEY@@SET_STRING',
    SET_STRING_SUCCESS = 'SUB_PAGE_REDUCER_KEY@@SET_STRING_SUCCESS',
}

export { SUB_PAGE_REDUCER_KEY };
