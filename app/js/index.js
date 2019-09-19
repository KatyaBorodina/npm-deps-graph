import React from 'react';
import { render } from 'react-dom';
import reducer from './store/reducer';
import { Provider } from 'react-redux';
import logger from './store/middleware/logger';
import { createStore, applyMiddleware } from 'redux';

import App from './App/index';

const store = createStore(reducer, applyMiddleware(logger));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);