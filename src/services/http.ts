import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { jsonToFormData } from 'helpers/converts';
import { IBaseRequest } from 'models/requests';
import { IBaseResponse } from 'models/responses';
import { STORAGE_KEYS, DEF_OPTS } from 'constants/services';
import { getStorage } from './storage';

/**
 * @returns Eject Middleware function
 */
export function AxiosRegistryResponseMiddleware<BRP>(middleware: {
    onFulfilled?: (
        value: AxiosResponse<IBaseResponse<BRP>>,
    ) => AxiosResponse<IBaseResponse<BRP>> | Promise<AxiosResponse<IBaseResponse<BRP>>>;
    onRejected?: (error: AxiosError<IBaseResponse<BRP>>) => AxiosError<IBaseResponse<BRP>>;
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

/**
 * Wrap api call return without catch
 */
export interface AxiosReturn<RP> {
    response?: AxiosResponse<IBaseResponse<RP>>;
    error?: IBaseException<RP>;
    isError?: boolean;
}

/**
 * A interface for api call function
 */
export interface IRequestParams<BRQ> extends AxiosRequestConfig {
    body?: IBaseRequest<BRQ>;
    isAuth?: boolean;
    isFormdata?: boolean;
}

/**
 * Wrap interface for api error
 */
export interface IBaseException<BRP> extends AxiosError<IBaseResponse<BRP>> {}

/**
 * setHeader internal used
 */
function setHeader(isAuth: boolean, customHeader: Record<string, string> = {}) {
    const userInfo = getStorage<{
        token: string;
    }>(STORAGE_KEYS.USER);
    const TMP_OPTS = isAuth && userInfo ? { Authorization: `Bearer ${userInfo.token}` } : {};

    return { ...DEF_OPTS, ...TMP_OPTS, ...customHeader };
}

/**
 * Factory to spawn a api request
 * @param method method type
 */
export function SpawnRequest<RQ, RP>(
    method: 'GET' | 'POST' | 'PUT' | 'DEL' | string,
): (params: IRequestParams<RQ>) => Promise<AxiosReturn<RP>> {
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
async function _GET<RQ, RP>(params: IRequestParams<RQ>): Promise<AxiosReturn<RP>> {
    const { isAuth = false } = params;
    params.baseURL = window.env.API_URL;
    try {
        const respone = await axios({
            ...params,
            method: 'GET',
            headers: setHeader(isAuth, params.headers),
        });
        return {
            isError: false,
            response: respone,
            error: undefined,
        };
    } catch (e) {
        return {
            isError: true,
            response: (e as IBaseException<RP>).response,
            error: e as IBaseException<RP>,
        };
    }
}

async function _PUT<RQ, RP>(params: IRequestParams<RQ>): Promise<AxiosReturn<RP>> {
    const { body = {}, isAuth = false, isFormdata = false } = params;
    params.baseURL = window.env.API_URL;
    try {
        const respone = await axios({
            ...params,
            method: 'PUT',
            headers: setHeader(isAuth, params.headers),
            data: isFormdata ? jsonToFormData(body) : body,
        });
        return {
            isError: false,
            response: respone,
            error: undefined,
        };
    } catch (e) {
        return {
            isError: true,
            response: (e as IBaseException<RP>).response,
            error: e as IBaseException<RP>,
        };
    }
}

async function _POST<RQ, RP>(params: IRequestParams<RQ>): Promise<AxiosReturn<RP>> {
    const { body = {}, isAuth = false, isFormdata = false } = params;
    params.baseURL = window.env.API_URL;
    try {
        const respone = await axios({
            ...params,
            method: 'POST',
            headers: setHeader(isAuth, params.headers),
            data: isFormdata ? jsonToFormData(body) : body,
        });
        return {
            isError: false,
            response: respone,
            error: undefined,
        };
    } catch (e) {
        return {
            isError: true,
            response: (e as IBaseException<RP>).response,
            error: e as IBaseException<RP>,
        };
    }
}

async function _DEL<RQ, RP>(params: IRequestParams<RQ>): Promise<AxiosReturn<RP>> {
    const { isAuth = false } = params;
    params.baseURL = window.env.API_URL;
    try {
        const respone = await axios({
            ...params,
            method: 'DELETE',
            headers: setHeader(isAuth, params.headers),
        });
        return {
            isError: false,
            response: respone,
            error: undefined,
        };
    } catch (e) {
        return {
            isError: true,
            response: (e as IBaseException<RP>).response,
            error: e as IBaseException<RP>,
        };
    }
}
