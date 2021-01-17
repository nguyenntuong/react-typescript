export interface ILocalState {
    required: string;
}
export interface IGlobalState {
    [key: string]: ILocalState;
}
export const initialState: IGlobalState = {};
