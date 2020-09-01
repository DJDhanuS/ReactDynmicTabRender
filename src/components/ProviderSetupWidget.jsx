import React from 'react';
import { Provider } from 'react-redux';
import BaseWidget from 'web-shell-core/widgets/BaseWidget';
import store from '../store/';
import App from './App';

export default class ProviderSetupWidget extends BaseWidget {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}
