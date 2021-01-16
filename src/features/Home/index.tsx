import { useEffect } from 'react';
import { composeInferTypeMemo } from 'utils/composeInferType';
import { connectReducerToProps } from 'utils/connectReducerToProps';
import { withReducerSaga } from 'utils/withReducerSaga';
import 'extensions/string.extensions';
import { doSomeAsyncOperator } from './actions';
import reducer from './reducer';
import saga from './saga';
import { selectId } from './selectors';

export interface IHomeProps {
    id: string;
    doAsyncOperator: (newId: string) => void;
}
function Home({
    id,
    doAsyncOperator,
}: IHomeProps): React.FunctionComponentElement<IHomeProps> {
    useEffect(() => {
        setTimeout(() => {
            doAsyncOperator('TUONG ASYNC');
        }, 2000);
    }, [doAsyncOperator]);
    return <>Home {id}</>;
}
const mapReducer = connectReducerToProps(
    {
        id: selectId,
    },
    (dispatch) => ({
        dispatch,
        doAsyncOperator: (newId: string) =>
            dispatch(
                doSomeAsyncOperator({
                    id: newId,
                }),
            ),
    }),
);
export default composeInferTypeMemo(Home)(
    withReducerSaga(reducer.name, reducer.reducer, saga),
    mapReducer,
);
