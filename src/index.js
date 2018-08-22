import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout/Layout';
import { unregister } from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Layout />, document.getElementById('root'));
unregister();
