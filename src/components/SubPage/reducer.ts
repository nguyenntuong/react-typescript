/*
 *
 * Dashboard reducer
 *
 */
import produce from 'immer';
import { SUB_PAGE_REDUCER_KEY } from './constants';
import { Reducer } from 'redux';

import { SubPageActions } from './actions';
import { ILocalState } from 'state';

export interface SubPageStateType extends ILocalState {
    readonly id?: string;
}

export const initialState: SubPageStateType = {
    id: '',
    errors: {},
    loadings: {},
};

const reducer: Reducer<SubPageStateType, SubPageActions> = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SUB_PAGE_REDUCER_KEY.SET_STRING_SUCCESS:
                draft.id = action.id;
                break;

            default:
                break;
        }
    });

export default reducer;
