import { IBaseRequestModel } from './baseModel';

export interface IBaseRequest<T extends IBaseRequestModel> {
    readonly requestData: T;
}
