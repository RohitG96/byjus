import { combineReducers } from 'redux';
import collection from './collection';
import newPage from './newPage'

export default {
  entries: combineReducers({
    collection,
    newPage
  }),
};