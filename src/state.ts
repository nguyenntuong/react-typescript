export interface IAPIError {
    errorCode?: number;
    message?: string;
}
export interface ILocalState {
    readonly errors: {
        [alias: string]: IAPIError | undefined;
    };
    readonly loadings: {
        [alias: string]: boolean | undefined;
    };
}
export interface IGlobalState {
    [key: string]: ILocalState;
}
export const initialState: IGlobalState = {};
