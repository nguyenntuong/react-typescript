import React, { useCallback, useEffect, useState } from 'react';
import TitleBar from 'components/TitleBar';
import SiderBar from 'components/SiderBar';
import AppRouting from 'components/AppRouting';
import SystemErrorNotify from 'components/SystemErrorNotify';
import { AxiosRegistryResponseMiddleware } from 'services/http';

export interface IAppProps {}

function App(props: IAppProps): React.FunctionComponentElement<IAppProps> {
    const [isSiderBarOpen, setIsSiderOpen] = useState(false);
    const [isSystemError, setIsSystemError] = useState(true);
    const [systemErrorModel, setSystemErrorModel] = useState<{
        title?: string;
        message?: string;
        image?: string;
        tooltips?: string;
        reloadOption?: boolean;
    }>({
        message: 'The error seems to have been caused by the client.',
        title: 'Client exception!',
        tooltips: 'Try reload the browser.',
        reloadOption: true,
    });
    useEffect(() => {
        const eject = AxiosRegistryResponseMiddleware({
            onRejected: (error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    const statusCode = error.response.status;
                    if (statusCode >= 400 && statusCode < 500) {
                        setSystemErrorModel({
                            message: 'The error seems to have been caused by the client.',
                            title: 'Client exception!',
                            tooltips: 'Try reload the browser.',
                            reloadOption: true,
                        });
                    } else if (statusCode >= 500) {
                        setSystemErrorModel({
                            message: 'The server failed to fulfill a request',
                            title: 'Server exception!',
                            tooltips: 'Please contact to administrator for this issue.',
                            reloadOption: true,
                        });
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    setSystemErrorModel({
                        message: 'The request was made but no response was received',
                        title: 'Client exception!',
                        tooltips: 'Check your internet connection or try to restart your browser.',
                        reloadOption: true,
                    });
                } else {
                    // Something happened in setting up the request that triggered an Error
                    setSystemErrorModel({
                        message: 'The exception not specific.',
                        title: 'Unknow exception!',
                        tooltips: 'Please contact to administrator if this issue appear too many times.',
                        reloadOption: true,
                    });
                }
                return error;
            },
        });
        return () => {
            eject();
        };
    }, []);
    const changeSiderBarStatus = useCallback(() => {
        setIsSiderOpen((oldState) => !oldState);
    }, []);
    const onCloseSystemPopupError = useCallback(() => {
        setIsSystemError((oldState) => !oldState);
    }, []);
    return (
        <div className="App">
            <SystemErrorNotify isShow={isSystemError} onCloseClick={onCloseSystemPopupError} {...systemErrorModel} />
            <SiderBar isShow={isSiderBarOpen} onMenuItemClick={changeSiderBarStatus} />
            <div className={`app-container ${isSiderBarOpen ? 'show-siderbar' : 'hide-siderbar'}`}>
                <TitleBar isSiderBarOpened={isSiderBarOpen} onBurgerMenuClick={changeSiderBarStatus} />
                <div className="app-content">
                    <AppRouting />
                </div>
            </div>
        </div>
    );
}

export default App;
