import axios, { AxiosResponse } from 'axios';
import { jsonToFormData } from 'helpers/dataTransforms';
import { IBaseRequest } from 'models/requests';
import { IBaseRequestModel } from 'models/requests/baseModel';
import { IBaseRespone } from 'models/respones';
import { IBaseResponeModel } from 'models/respones/baseModel';
import { reviverCustom } from './JSON.reviver';

const DEF_OPTS = { 'Content-Type': 'application/json; charset=utf-8' };

export enum STORAGE_KEYS {
    ACCESS_TOKEN = 'ACCESS_TOKEN',
    CURRENT_PATH = 'CURRENT_PATH',
    USER = 'USER',
}

export interface IRequestParams<BRQ extends IBaseRequestModel> {
    path: string;
    body?: IBaseRequest<BRQ>;
    urlParams?: string;
    isAuth?: boolean;
    isFormdata?: boolean;
}
export interface IBaseException<BRP extends IBaseResponeModel> {
    config?: {
        [key: string]: any;
    };
    response?: {
        // `data` is the response that was provided by the server
        data?: IBaseRespone<BRP>;

        // `status` is the HTTP status code from the server response
        status?: number;

        // `statusText` is the HTTP status message from the server response
        statusText?: string;

        // `headers` the HTTP headers that the server responded with
        // All header names are lower cased and can be accessed using the bracket notation.
        // Example: `response.headers['content-type']`
        headers?: {
            [key: string]: string;
        };
    };
    isAxiosError: boolean;
    toJSON: () => string;
    message: string;
    stack: string;

    // `request` is the request that generated this response
    // It is the last ClientRequest instance in node.js (in redirects)
    // and an XMLHttpRequest instance in the browser
    request?: XMLHttpRequest;
}
// Setup a global JSON transform for entry application
function setupJSONTransforms() {
    const jsonParseOrigin = JSON.parse;
    JSON.parse = (text, reviver = reviverCustom) => {
        return jsonParseOrigin(text, reviver) as unknown;
    };
    return () => {
        JSON.parse = jsonParseOrigin;
    };
}
/**
 * setStorage
 * @param val Should not use JSON.stringify for this value, because we do it in internal.
 * If do, you will cannot get back it as an object anymore.
 */
export function setStorage(key: string, val: any) {
    window.localStorage?.setItem(key, JSON.stringify(val));
}

export function getStorage<R = string>(key: string): R | null {
    const val = window.localStorage?.getItem(key) as string;
    if (!val) {
        return null;
    }
    return JSON.parse(val) as R;
}

export function removeStorage(key: string) {
    window.localStorage?.removeItem(key);
}

/**
 * setSessionStorage
 * @param val Should not use JSON.stringify for this value, because we do it in internal.
 * If do, you will cannot get back it as an object anymore.
 */
export function setSessionStorage(key: string, val: any) {
    window.sessionStorage?.setItem(key, JSON.stringify(val));
}

export function getSessionStorage<R>(key: string): R | null {
    const val = window.sessionStorage?.getItem(key) as string;
    if (!val) {
        return null;
    }
    return JSON.parse(val) as R;
}

export function removeSessionStorage(key: string) {
    window.sessionStorage.removeItem(key);
}

export function setHeader(isAuth: boolean) {
    const userInfo = getStorage<{
        token: string;
    }>(STORAGE_KEYS.USER);
    const TMP_OPTS = isAuth ? { Authorization: `Bearer ${userInfo?.token}` } : {};

    return { ...DEF_OPTS, ...TMP_OPTS };
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
    const { path, urlParams = '', isAuth = false } = params;
    const url = window.env.API_URL + path;
    try {
        const respone = await axios({
            method: 'GET',
            headers: setHeader(isAuth),
            params: urlParams,
            url,
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
    const { path, body = {}, isAuth = false } = params;
    const url = window.env.API_URL + path;
    try {
        const respone = await axios({
            method: 'GET',
            headers: setHeader(isAuth),
            data: body,
            url,
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
    const { path, body = {}, isAuth = false, isFormdata = false } = params;
    const url = window.env.API_URL + path;
    try {
        const respone = await axios({
            method: 'POST',
            headers: setHeader(isAuth),
            data: isFormdata ? jsonToFormData(body) : body,
            url,
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
    const { path, isAuth = false } = params;
    const url = window.env.API_URL + path;
    try {
        const respone = await axios({
            method: 'DELETE',
            headers: setHeader(isAuth),
            url,
        });
        return respone;
    } catch (e) {
        const cast = e as IBaseException<RP>;
        throw cast;
    }
}

export default function injectWindow() {
    setupJSONTransforms();
    window.setStorage = setStorage;
    window.getStorage = getStorage;
    window.removeStorage = removeStorage;
    window.setSessionStorage = setSessionStorage;
    window.getSessionStorage = getSessionStorage;
    window.removeSessionStorage = removeSessionStorage;
}
