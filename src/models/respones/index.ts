import { IBaseResponeModel } from './baseModel';

export interface IBaseRespone<T extends IBaseResponeModel> {
    readonly data: T;
}
