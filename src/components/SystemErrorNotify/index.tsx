import React, { FunctionComponentElement, useCallback } from 'react';
import { composeInferTypeMemo } from 'utils/composeInferType';
import * as images from 'assets/images';
import './styles.scss';

export interface ISystemErrorNotifyProps {
    isShow?: boolean;
    title?: string;
    message?: string;
    image?: string;
    tooltips?: string;
    reloadOption?: boolean;
    onCloseClick: () => void;
}

function SystemErrorNotify({
    image = images.genericError,
    isShow,
    message = 'Something goes wrong, may be due to internet connection. Please check agian !',
    title = 'Internal Error',
    tooltips = 'Try to refresh your browser.',
    reloadOption,
    onCloseClick,
}: ISystemErrorNotifyProps): FunctionComponentElement<ISystemErrorNotifyProps> {
    const reloadPage = useCallback(() => {
        window.location.reload();
    }, []);
    return (
        <div className={`system-error-notify ${isShow ? 'show' : 'hidden'}`}>
            <div className={`system-error-notify__background`}>
                <div className={`system-error-notify__container`}>
                    <div className={`error-image`}>
                        <img src={image} alt={title} />
                    </div>
                    <div className={`error-content`}>
                        <div className={`error-content__tool-bar`}>
                            <p className={`title`}>{title}</p>
                            <div className={`tool-button-group`}>
                                <div className={`tool-button-group__question`}>
                                    <img className={`question-icon`} src={images.helpBlack} alt="About this" />
                                    <div className={`question-tooltip`}>{tooltips}</div>
                                </div>

                                <img
                                    onClick={onCloseClick}
                                    className={`tool-button-group__close`}
                                    src={images.closeBlack}
                                    alt="Close"
                                />
                            </div>
                        </div>
                        <div className={`error-content__message`}>
                            <p className={`text`}>{message}</p>
                        </div>
                        {reloadOption && (
                            <div className={`error-content__footer`}>
                                <button type="button" className={`btn-reload`} onClick={reloadPage}>
                                    Reload
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default composeInferTypeMemo(SystemErrorNotify)();
