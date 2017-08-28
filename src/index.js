import React from 'react';
import ReactDOM from 'react-dom';
import ExportBox from './ExportBox'

ReactDOM.render(
  <ExportBox
    url='http://localhost:3001/api/exports'
    pollInterval={2000} />,
  document.getElementById('root')
);
