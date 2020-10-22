import { createSelector } from 'reselect';
import { IGlobalState } from 'state';
import { DashboardStateType, initialState } from './reducer';
import { REDUCER_SAGA_IDENTIFY } from './constants';

/**
 * Direct selector to the dashboardPage state domain
 */

const dashboardState: (state: IGlobalState) => DashboardStateType = (state: IGlobalState) =>
    state[REDUCER_SAGA_IDENTIFY] || initialState;

/**
 * Other specific selectors
 */

export const selectId = () => createSelector(dashboardState, (substate) => substate.id);
export const selectWeathers = () => createSelector(dashboardState, (substate) => substate.weatherForcast);
