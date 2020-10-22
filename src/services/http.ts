import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { jsonToFormData } from 'helpers/dataTransforms';
import { IBaseRequest } from 'models/requests';
import { IBaseRequestModel } from 'models/requests/baseModel';
import { IBaseRespone } from 'models/respones';
import { IBaseResponeModel } from 'models/respones/baseModel';
import { STORAGE_KEYS, DEF_OPTS } from './constants';
import { getStorage } from './storage';

/**
 * @returns Eject Middleware function
 */
export function AxiosRegistryResponseMiddleware<BRP extends IBaseResponeModel = any>(middleware: {
    onFulfilled?: (
        value: AxiosResponse<IBaseRespone<BRP>>,
    ) => AxiosResponse<IBaseRespone<BRP>> | Promise<AxiosResponse<IBaseRespone<BRP>>>;
    onRejected?: (error: AxiosError<IBaseRespone<BRP>>) => AxiosError<IBaseRespone<BRP>>;
}): () => void {
    const interceptorsResponseId = axios.interceptors.response.use(middleware.onFulfilled, middleware.onRejected);
    return () => {
        axios.interceptors.response.eject(interceptorsResponseId);
    };
}

/**
 * @returns Eject Middleware function
 */
export function AxiosRegistryRequestMiddleware(middleware: {
    onFulfilled?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
    onRejected?: (error: AxiosError) => AxiosError;
}): () => void {
    const interceptorsResponseId = axios.interceptors.request.use(middleware.onFulfilled, middleware.onRejected);
    return () => {
        axios.interceptors.request.eject(interceptorsResponseId);
    };
}

export interface IRequestParams<BRQ extends IBaseRequestModel> extends AxiosRequestConfig {
    body?: IBaseRequest<BRQ>;
    isAuth?: boolean;
    isFormdata?: boolean;
}
export interface IBaseException<BRP extends IBaseResponeModel> extends AxiosError<IBaseRespone<BRP>> {}

function setHeader(isAuth: boolean, customHeader: Record<string, string> = {}) {
    const userInfo = getStorage<{
        token: string;
    }>(STORAGE_KEYS.USER);
    const TMP_OPTS = isAuth ? { Authorization: `Bearer ${userInfo?.token}` } : {};

    return { ...DEF_OPTS, ...TMP_OPTS, ...customHeader };
}
export function SpawnRequest<RQ extends IBaseRequestModel, RP extends IBaseResponeModel>(
    method: 'GET' | 'POST' | 'PUT' | 'DEL',
): (params: IRequestParams<RQ>) => Promise<AxiosResponse<IBaseRespone<RP>>> {
    switch (method) {
        case 'GET':
            return (params: IRequestParams<RQ>) => _GET<RQ, RP>(params);
        case 'POST':
            return (params: IRequestParams<RQ>) => _POST<RQ, RP>(params);
        case 'PUT':
            return (params: IRequestParams<RQ>) => _PUT<RQ, RP>(params);
        case 'DEL':
            return (params: IRequestParams<RQ>) => _DEL<RQ, RP>(params);
        default:
            throw new Error(`This method ${method} not support!`);
    }
}
async function _GET<RQ extends IBaseRequestModel, RP extends IBaseResponeModel>(
    params: IRequestParams<RQ>,
): Promise<AxiosResponse<IBaseRespone<RP>>> {
    const { isAuth = false, url } = params;
    const fullUrl = `${window.env.API_URL}+${url}`;
    try {
        const respone = await axios({
            ...params,
            method: 'GET',
            headers: setHeader(isAuth, params.headers),
            url: fullUrl,
        });
        return respone;
    } catch (e) {
        const cast = e as IBaseException<RP>;
        throw cast;
    }
}

async function _PUT<RQ extends IBaseRequestModel, RP extends IBaseResponeModel>(
    params: IRequestParams<RQ>,
): Promise<AxiosResponse<IBaseRespone<RP>>> {
    const { body = {}, isAuth = false, url, isFormdata = false } = params;
    const fullUrl = `${window.env.API_URL}+${url}`;
    try {
        const respone = await axios({
            ...params,
            method: 'PUT',
            headers: setHeader(isAuth, params.headers),
            data: isFormdata ? jsonToFormData(body) : body,
            url: fullUrl,
        });
        return respone;
    } catch (e) {
        const cast = e as IBaseException<RP>;
        throw cast;
    }
}

async function _POST<RQ extends IBaseRequestModel, RP extends IBaseResponeModel>(
    params: IRequestParams<RQ>,
): Promise<AxiosResponse<IBaseRespone<RP>>> {
    const { url, body = {}, isAuth = false, isFormdata = false } = params;
    const fullUrl = `${window.env.API_URL}+${url}`;
    try {
        const respone = await axios({
            ...params,
            method: 'POST',
            headers: setHeader(isAuth, params.headers),
            data: isFormdata ? jsonToFormData(body) : body,
            url: fullUrl,
        });
        return respone;
    } catch (e) {
        const cast = e as IBaseException<RP>;
        throw cast;
    }
}

async function _DEL<RQ extends IBaseRequestModel, RP extends IBaseResponeModel>(
    params: IRequestParams<RQ>,
): Promise<AxiosResponse<IBaseRespone<RP>>> {
    const { url, isAuth = false } = params;
    const fullUrl = `${window.env.API_URL}+${url}`;
    try {
        const respone = await axios({
            ...params,
            method: 'DELETE',
            headers: setHeader(isAuth, params.headers),
            url: fullUrl,
        });
        return respone;
    } catch (e) {
        const cast = e as IBaseException<RP>;
        throw cast;
    }
}
