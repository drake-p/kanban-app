import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

if(process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}

console.log(React.version);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
