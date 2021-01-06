/**
 * setStorage
 * @param val Should not use JSON.stringify for this value, because we do it in internal.
 * If do, you will cannot get back it as an object anymore.
 */
export function setStorage(key: string, val: unknown): void {
    window.localStorage?.setItem(key, JSON.stringify(val));
}

export function getStorage<R = string>(key: string): R | null {
    const val = window.localStorage?.getItem(key) as string;
    if (!val) {
        return null;
    }
    return JSON.parse(val) as R;
}

export function removeStorage(key: string): void {
    window.localStorage?.removeItem(key);
}
/**
 * setSessionStorage
 * @param val Should not use JSON.stringify for this value, because we do it in internal.
 * If do, you will cannot get back it as an object anymore.
 */

export function setSessionStorage(key: string, val: unknown): void {
    window.sessionStorage?.setItem(key, JSON.stringify(val));
}

export function getSessionStorage<R>(key: string): R | null {
    const val = window.sessionStorage?.getItem(key) as string;
    if (!val) {
        return null;
    }
    return JSON.parse(val) as R;
}

export function removeSessionStorage(key: string): void {
    window.sessionStorage.removeItem(key);
}
