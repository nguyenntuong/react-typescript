// This import must be here, top of entry application until you dont need that.
import 'polyfills';
// Langi18
import './i18n';
// Init css
import './post-index.css';
import './index.scss';

/// Rest of code
import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import App from './App';
import { Provider } from 'react-redux';
import { history } from 'utils/history';
import * as serviceWorker from './serviceWorker';
import configureStore from './store';
import { initialState } from 'state';
import injectWindow from './services';

// inject Service to global Window
injectWindow();

// Create redux store with history
const store = configureStore(history, initialState);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
