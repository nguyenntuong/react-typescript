/// <reference types="react-scripts" />
/// <reference types="webpack-env" />
/// <reference types="node" />
/// <reference path="./services" />
type ReturnUnpackPromise<F> = F extends (...args: any[]) => Promise<infer T> ? T : F;
interface Window {
    readonly env: {
        readonly API_URL: string;
    };
    /**
     * setStorage
     * @param val Should not use JSON.stringify for this value, because we do it in internal.
     * If do, you will cannot get back it as an object anymore.
     */
    setStorage: (key: string, val: any) => void;
    getStorage: <R = string>(key: string) => R | null;
    removeStorage: (key: string) => void;
    /**
     * setSessionStorage
     * @param val Should not use JSON.stringify for this value, because we do it in internal.
     * If do, you will cannot get back it as an object anymore.
     */
    setSessionStorage: (key: string, val: any) => void;
    getSessionStorage: <R>(key: string) => R | null;
    removeSessionStorage: (key: string) => void;
}
