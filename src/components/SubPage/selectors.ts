import { createSelector } from 'reselect';
import { IGlobalState } from 'state';
import { SubPageStateType, initialState } from './reducer';
import { REDUCER_SAGA_IDENTIFY } from './constants';

/**
 * Direct selector to the subPage state domain
 */

const subPageState: (state: IGlobalState) => SubPageStateType = (state: IGlobalState) =>
    state[REDUCER_SAGA_IDENTIFY] || initialState;

/**
 * Other specific selectors
 */

export const selectId = () => createSelector(subPageState, (substate) => substate.id);
