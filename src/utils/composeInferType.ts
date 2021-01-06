import { memo, PropsWithChildren } from 'react';
import { compose } from 'redux';
export function composeInferTypeMemo<T>(
    component: T,
    propsAreEqual?: (prevProps: Readonly<PropsWithChildren<T>>, nextProps: Readonly<PropsWithChildren<T>>) => boolean,
) {
    return (...functions: Function[]): T => {
        return compose<T>(...functions, memo)(component, propsAreEqual);
    };
}

export function composeInferType<T>(component: T, ...args: unknown[]) {
    return (...functions: Function[]): T => {
        return compose<T>(...functions)(component, ...args);
    };
}
