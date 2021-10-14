import { applyMiddleware, createStore } from 'redux';
import reducers from './src/reducers';
import ReduxThunk from 'redux-thunk';

const middlewares = [ReduxThunk];

const store = createStore(reducers, {}, applyMiddleware(...middlewares));

export default store;