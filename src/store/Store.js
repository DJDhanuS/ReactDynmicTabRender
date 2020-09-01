import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer'

const INITIAL_STATE = {
    data: []
};
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
    rootReducer,
    // INITIAL_STATE,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;

