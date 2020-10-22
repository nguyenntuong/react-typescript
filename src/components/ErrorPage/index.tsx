import React, { FunctionComponentElement, useMemo } from 'react';
import { composeInferTypeMemo } from 'utils/composeInferType';
import { ERROR_CODE_MAPPING } from './errorImageMapping';
import styles from './styles.module.scss';

export interface IErrorPageProps {
    errorCode?: string | number;
    errorTitle?: string;
    errorMessage?: string;
}

function ErrorPage({
    errorCode,
    errorTitle,
    errorMessage,
}: IErrorPageProps): FunctionComponentElement<IErrorPageProps> {
    const errorDes = useMemo(() => ERROR_CODE_MAPPING(errorCode, errorTitle, errorMessage), [
        errorCode,
        errorTitle,
        errorMessage,
    ]);
    return (
        <div className={styles['error-page']}>
            {errorDes.image && (
                <div className={styles['image-container']}>
                    <img className={styles['image-container__image']} src={errorDes.image} alt={errorDes.message} />
                </div>
            )}
            <div className={styles['message-container']}>
                <h3 className={styles['message-container__title']}>{errorDes.title}</h3>
                <p className={styles['message-container__description']}>{errorDes.message}</p>
            </div>
        </div>
    );
}
export default composeInferTypeMemo(ErrorPage)();
