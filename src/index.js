import './css/main.css';
import AsyncComponent from './Async/Async';
import React from 'react';
import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';

const AsyncRoutes = AsyncComponent({
  loader: () => import('./Routes/Routes')
});

ReactDOM.render(<AsyncRoutes />, document.getElementById('root'));
// registerServiceWorker();
