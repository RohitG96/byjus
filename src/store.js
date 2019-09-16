import {createStore, applyMiddleware} from 'redux';
import globalReducer from './globalReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(globalReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;