import SubPage from 'components/SubPage';
import React, { FunctionComponentElement, Suspense } from 'react';
import { composeInferTypeMemo } from 'utils/composeInferType';
import { useTranslation } from 'react-i18next';

export interface TestRenderProps {
    readonly some?: number;
}
function TestRender({ some }: TestRenderProps): FunctionComponentElement<TestRenderProps> {
    const { t } = useTranslation();
    return (
        <Suspense fallback="loading">
            <p>{t('error.402')}</p>
            <SubPage />
        </Suspense>
    );
}
export default composeInferTypeMemo(TestRender)();
