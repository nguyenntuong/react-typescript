/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { lazy, Suspense } from 'react';

export function lazyComponent<C extends React.ComponentType<any>>(
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
