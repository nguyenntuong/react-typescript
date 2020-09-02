import { IWeatherForcastRequest } from 'models/requests/weatherForcastRequest';
import { IWeatherForcastRespone } from 'models/respones/weatherForcastRespone';
import { Action } from 'redux';
import { IAPIError } from 'state';
import { DASHBOARD_REDUCER_KEY } from './constants';

export type IGetStringActionParam = {
    readonly id: string;
};
export interface IGotStringAction extends Action<DASHBOARD_REDUCER_KEY.SET_STRING_SUCCESS> {
    readonly id: string;
}
export interface IGetStringAction extends Action<DASHBOARD_REDUCER_KEY.SET_STRING> {
    readonly params: IGetStringActionParam;
}

export interface IRequestWeatherForcastAction extends Action<DASHBOARD_REDUCER_KEY.GET_WEATHER_FORCAST> {
    readonly params: IWeatherForcastRequest;
}

export interface IRequestWeatherForcastSuccessAction extends Action<DASHBOARD_REDUCER_KEY.GET_WEATHER_FORCAST_SUCCESS> {
    readonly data: IWeatherForcastRespone;
}

export interface IRequestWeatherForcastFailAction extends Action<DASHBOARD_REDUCER_KEY.GET_WEATHER_FORCAST_FAIL> {
    readonly errors?: IAPIError;
}

export const RequestWeatherForcastAction = (params: IWeatherForcastRequest): IRequestWeatherForcastAction => ({
    type: DASHBOARD_REDUCER_KEY.GET_WEATHER_FORCAST,
    params,
});
export const RequestWeatherForcastSuccessAction = (
    data: IWeatherForcastRespone,
): IRequestWeatherForcastSuccessAction => ({
    type: DASHBOARD_REDUCER_KEY.GET_WEATHER_FORCAST_SUCCESS,
    data,
});
export const RequestWeatherForcastFailAction = (errors: IAPIError): IRequestWeatherForcastFailAction => ({
    type: DASHBOARD_REDUCER_KEY.GET_WEATHER_FORCAST_FAIL,
    errors,
});

export const GotStringAction = (id: string): IGotStringAction => ({
    type: DASHBOARD_REDUCER_KEY.SET_STRING_SUCCESS,
    id,
});

export const GetStringAction = (params: IGetStringActionParam): IGetStringAction => ({
    type: DASHBOARD_REDUCER_KEY.SET_STRING,
    params,
});

export type DashBoardActions =
    | IGotStringAction
    | IGetStringAction
    | IRequestWeatherForcastAction
    | IRequestWeatherForcastSuccessAction
    | IRequestWeatherForcastFailAction;
