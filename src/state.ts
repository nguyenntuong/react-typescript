export interface ILocalState {}
export interface IGlobalState {
    [key: string]: ILocalState;
}
export const initialState: IGlobalState = {};
