import {combineReducers} from 'redux';
import entries from './entries';
let reducers = {
  ...entries.reducers,
};
export default combineReducers (reducers);
