import React from 'react';

import { withReducerSaga } from 'utils/withReducerSaga';
import { connectReducerToProps } from 'utils/connectReducerToProps';
import { REDUCER_SAGA_IDENTIFY } from './constants';
import { composeInferTypeMemo } from 'utils/composeInferType';

import reducer from './reducer';
import saga from './saga';

import { selectId, selectWeathers } from './selectors';
import { DashBoardActions, GetStringAction, IGetStringActionParam, RequestWeatherForcastAction } from './actions';
import { IWeatherForcastRespone } from 'models/respones/weatherForcastRespone';
import { IWeatherForcastRequest } from 'models/requests/weatherForcastRequest';

import './styles.scss';

type DashboardProps = {
    readonly id?: string;
    readonly weathers?: IWeatherForcastRespone;
    readonly getStringAction?: (params: IGetStringActionParam) => void;
    readonly requestWeatherAction?: (params: IWeatherForcastRequest) => void;
};
function Dashboard({ weathers, requestWeatherAction }: DashboardProps): React.FunctionComponentElement<DashboardProps> {
    return (
        <div className="home">
            {weathers?.weathers?.map((day) => (
                <p key={day.date.toISOString()}>
                    {day.date.toLocaleDateString()}. {day.temperatureC} C. {day.summary}
                </p>
            ))}
            <p>
                Body AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            </p>
        </div>
    );
}

const connectReducerToLocalProps = connectReducerToProps<DashboardProps, DashBoardActions>(
    {
        id: selectId(),
        weathers: selectWeathers(),
    },
    (dispatch) => ({
        dispatch,
        getStringAction: (params: IGetStringActionParam) => {
            dispatch(GetStringAction(params));
        },
        requestWeatherAction: (params: IWeatherForcastRequest) => {
            dispatch(RequestWeatherForcastAction(params));
        },
    }),
);
const withReducerSagaLocal = withReducerSaga(REDUCER_SAGA_IDENTIFY, reducer, saga);

export default composeInferTypeMemo(Dashboard)(withReducerSagaLocal, connectReducerToLocalProps);
