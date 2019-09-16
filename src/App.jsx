import React from 'react';
import DatePicker from 'antd/es/date-picker'; // for js
import Row from 'antd/es/row'

import Col from 'antd/es/col';
// import 'antd/dist/antd.css';
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
