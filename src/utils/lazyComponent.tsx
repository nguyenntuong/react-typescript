import React, { FunctionComponent, lazy, Suspense } from 'react';

export function lazyComponent<C extends FunctionComponent<any>>(
    importFunc: () => Promise<{
        default: C;
    }>,
    { fallback = null } = { fallback: null },
) {
    const LAZY_COMPONENT = lazy<C>(importFunc);
    return (props: React.ComponentPropsWithRef<C>) => (
        <Suspense fallback={fallback}>
            <LAZY_COMPONENT {...props} />
        </Suspense>
    );
}
