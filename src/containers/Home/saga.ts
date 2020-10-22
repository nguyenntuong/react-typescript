import { call, put, takeEvery } from 'redux-saga/effects';
import { SpawnRequest } from 'services';
import { IRequestParams, IBaseException } from 'services/http';

import { DASHBOARD_REDUCER_KEY } from './constants';

import {
    GotStringAction,
    IGetStringAction,
    IRequestWeatherForcastAction,
    RequestWeatherForcastSuccessAction,
    RequestWeatherForcastFailAction,
} from './actions';
import { IWeatherForcastRespone } from 'models/respones/weatherForcastRespone';
import { IWeatherForcastRequest } from 'models/requests/weatherForcastRequest';

function* setString(action: IGetStringAction) {
    yield put(GotStringAction(action.params.id));
}

function* getWeather(action: IRequestWeatherForcastAction) {
    try {
        const request: IRequestParams<IWeatherForcastRequest> = {
            url: '/WeatherForecast',
        };
        const r = SpawnRequest<IWeatherForcastRequest, IWeatherForcastRespone>('GET');
        const result = (yield call(r, request)) as ReturnUnpackPromise<typeof r>;
        yield put(RequestWeatherForcastSuccessAction(result.data.data));
    } catch (ex) {
        const error = ex as IBaseException<IWeatherForcastRespone>;
        yield put(
            RequestWeatherForcastFailAction({
                errorCode: error.response?.status,
                message: error.response?.statusText,
            }),
        );
    }
}

export default function* saga() {
    yield takeEvery(DASHBOARD_REDUCER_KEY.SET_STRING, setString);
    yield takeEvery(DASHBOARD_REDUCER_KEY.GET_WEATHER_FORCAST, getWeather);
}
