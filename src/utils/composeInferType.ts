import { memo, PropsWithChildren } from 'react';
import { compose } from 'redux';
export function composeInferTypeMemo<T>(
    component: T,
    propsAreEqual?:
        | ((prevProps: Readonly<PropsWithChildren<T>>, nextProps: Readonly<PropsWithChildren<T>>) => boolean)
        | undefined,
) {
    return (...functions: ((...args: any[]) => any)[]): T => {
        return compose<T>(...functions, memo)(component, propsAreEqual);
    };
}

export function composeInferType<T>(component: T, ...args: any[]) {
    return (...functions: ((...args: any[]) => any)[]): T => {
        return compose<T>(...functions)(component, ...args);
    };
}
