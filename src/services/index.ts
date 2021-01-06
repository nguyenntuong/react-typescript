import { setupJSONTransforms } from '../helpers/json';
import {
    getStorage,
    setStorage,
    removeStorage,
    setSessionStorage,
    getSessionStorage,
    removeSessionStorage,
} from './storage';

export { SpawnRequest } from './http';
export default function injectWindow() {
    setupJSONTransforms();
    window.setStorage = setStorage;
    window.getStorage = getStorage;
    window.removeStorage = removeStorage;
    window.setSessionStorage = setSessionStorage;
    window.getSessionStorage = getSessionStorage;
    window.removeSessionStorage = removeSessionStorage;
}
