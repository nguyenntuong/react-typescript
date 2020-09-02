import React, { Fragment, useCallback, useEffect, useState } from 'react';

import TestRender from 'components/TestRender/lazy';
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

import styles from './styles.module.scss';

type DashboardProps = {
    readonly id?: string;
    readonly weathers?: IWeatherForcastRespone;
    readonly getStringAction?: (params: IGetStringActionParam) => void;
    readonly requestWeatherAction?: (params: IWeatherForcastRequest) => void;
};
function Dashboard({ weathers, requestWeatherAction }: DashboardProps): React.FunctionComponentElement<DashboardProps> {
    const [showTestRender, setIsShowTestRender] = useState(false);
    const toggleTestRender = useCallback(() => {
        setIsShowTestRender((old) => !old);
    }, []);
    useEffect(() => {
        if (requestWeatherAction) {
            // requestWeatherAction({});
        }
    }, [requestWeatherAction]);
    return (
        <Fragment>
            {showTestRender && <TestRender />}
            {weathers?.weathers?.map((day) => (
                <p key={day.date.toISOString()}>
                    {day.date.toLocaleDateString()}. {day.temperatureC} C. {day.summary}
                </p>
            ))}
            <p className={styles['style-app-p']}>This is from Dashboard</p>
            <button type="button" onClick={toggleTestRender}>
                Click to show TestRender
            </button>
        </Fragment>
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
