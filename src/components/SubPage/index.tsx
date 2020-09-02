import React, { useEffect } from 'react';

import reducer from './reducer';
import saga from './saga';
import { REDUCER_SAGA_IDENTIFY } from './constants';
import { connectReducerToProps } from 'utils/connectReducerToProps';
import { withReducerSaga } from 'utils/withReducerSaga';

import { selectId } from './selectors';
import { SubPageActions, GetStringAction, IGetStringAction, IGetStringActionParam } from './actions';
import * as dashboardSelector from 'containers/Dashboard/selectors';
import { composeInferTypeMemo } from 'utils/composeInferType';

type SubPageProps = {
    readonly id?: string;
    readonly fromDashboard?: string;
    readonly getStringAction?: (params: IGetStringActionParam) => IGetStringAction;
};
function SubPage({ id, fromDashboard, getStringAction }: SubPageProps): React.FunctionComponentElement<SubPageProps> {
    useEffect(() => {
        const interval = setInterval(() => {
            if (getStringAction) {
                getStringAction({
                    id: new Date().toISOString(),
                });
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [getStringAction]);
    return (
        <div>
            <p>{id}</p>
            <p>From Dashboard: {fromDashboard}</p>
        </div>
    );
}

const connectReducerToLocalProps = connectReducerToProps<SubPageProps, SubPageActions>(
    {
        id: selectId(),
        fromDashboard: dashboardSelector.selectId(),
    },
    (dispatch) => ({
        dispatch,
        getStringAction: (params: IGetStringActionParam) => {
            dispatch(GetStringAction(params));
        },
    }),
);
const withReducerSagaLocal = withReducerSaga(REDUCER_SAGA_IDENTIFY, reducer, saga);

export default composeInferTypeMemo(SubPage)(withReducerSagaLocal, connectReducerToLocalProps);
