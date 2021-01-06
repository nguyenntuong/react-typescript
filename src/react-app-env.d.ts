/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="react-scripts" />
/// <reference types="webpack-env" />
/// <reference types="node" />

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
