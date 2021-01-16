/* eslint-disable no-extend-native */
import { v4 as uuidv4 } from 'uuid';

// string.extensions.ts
export {};

declare global {
    interface String {
        createReducerActionIdentify(actionName?: string): string;
    }
}

String.prototype.createReducerActionIdentify = function (actionName?: string) {
    return createReducerActionIdentify(this.toString(), actionName);
};
export function createReducerActionIdentify(
    reducerSagaIdentify: string,
    actionName?: string,
): string {
    return `@@${reducerSagaIdentify}/${
        actionName && process.env.NODE_ENV !== 'production'
            ? actionName
            : uuidv4()
    }`;
}
