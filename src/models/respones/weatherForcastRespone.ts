import { IBaseResponeModel } from './baseModel';

export interface IWeatherForcastRespone extends IBaseResponeModel {
    readonly weathers: {
        readonly date: Date;
        readonly temperatureC: number;
        readonly summary: string;
    }[];
}
