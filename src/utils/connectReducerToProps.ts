import { connect, Selector } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { IGlobalState } from 'state';

export type SelectorProps<LocalProps> = { readonly [K in keyof LocalProps]: Selector<IGlobalState, LocalProps[K]> };

export function connectReducerToProps<LocalProps, LocalActions extends Action<unknown>>(
    selector: SelectorProps<LocalProps>,
    mapDispatchToProps: (
        dispatch: Dispatch<LocalActions>,
    ) => {
        readonly dispatch: Dispatch<LocalActions>;
        readonly [action: string]: Function;
    } = (dispatch) => ({
        dispatch,
    }),
) {
    const mapStateToProps = createStructuredSelector<IGlobalState, LocalProps>(selector);
    return connect(mapStateToProps, mapDispatchToProps);
}
