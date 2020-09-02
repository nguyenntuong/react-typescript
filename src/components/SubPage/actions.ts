import { Action } from 'redux';
import { SUB_PAGE_REDUCER_KEY } from './constants';

export type IGetStringActionParam = {
    readonly id: string;
};
export interface IGotStringAction extends Action<SUB_PAGE_REDUCER_KEY.SET_STRING_SUCCESS> {
    readonly id: string;
}
export interface IGetStringAction extends Action<SUB_PAGE_REDUCER_KEY.SET_STRING> {
    readonly params: IGetStringActionParam;
}

export const GotStringAction = (id: string): IGotStringAction => ({
    type: SUB_PAGE_REDUCER_KEY.SET_STRING_SUCCESS,
    id,
});

export const GetStringAction = (params: IGetStringActionParam): IGetStringAction => ({
    type: SUB_PAGE_REDUCER_KEY.SET_STRING,
    params,
});

export type SubPageActions = IGotStringAction | IGetStringAction;
