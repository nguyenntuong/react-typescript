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
