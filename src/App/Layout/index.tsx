import React, { memo } from 'react';

function Layout({ children }: React.PropsWithChildren<{}>): React.FunctionComponentElement<{}> {
    return <div className="app-layout">{children}</div>;
}

export default memo(Layout);
