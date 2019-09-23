import React from 'react';
import './index.css';
import Entries from './entries/entries';
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  
  <Provider store={store}>
      <Entries />
  </Provider>
);

export default App;
