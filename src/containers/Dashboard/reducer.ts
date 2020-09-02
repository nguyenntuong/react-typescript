import { DASHBOARD_REDUCER_KEY } from './constants';
import { Reducer } from 'redux';

import { DashBoardActions } from './actions';
import { IAPIError, ILocalState } from 'state';
import { IWeatherForcastRespone } from 'models/respones/weatherForcastRespone';
import { produce } from 'utils/produce';

export interface DashboardStateType extends ILocalState {
    readonly id?: string;
    readonly weatherForcast?: IWeatherForcastRespone;
    readonly errors: {
        weatherForcast?: IAPIError;
    };
    readonly loadings: {
        weatherForcast?: boolean;
    };
}
export const initialState: DashboardStateType = {
    errors: {},
    loadings: {},
};

const reducer: Reducer<DashboardStateType, DashBoardActions> = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case DASHBOARD_REDUCER_KEY.SET_STRING_SUCCESS:
                draft.id = action.id;
                break;
            case DASHBOARD_REDUCER_KEY.GET_WEATHER_FORCAST_SUCCESS:
                draft.weatherForcast = action.data;
                delete draft.errors.weatherForcast;
                break;
            case DASHBOARD_REDUCER_KEY.GET_WEATHER_FORCAST_FAIL:
                draft.errors.weatherForcast = action.errors;
                break;
            default:
                break;
        }
    });

export default reducer;
