// import React from 'react';
// import DatePicker from 'antd/es/date-picker'; // for js
// import Row from 'antd/es/row'
// import 'antd/es/date-picker/style/css';
// import 'antd/es/row/style/css';
// import Col from 'antd/es/col';
// import 'antd/es/col/style/css';
import Entries from './entries/entries'
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
      <Entries />
  </Provider>
);

export default App;
