import error from '../assets/images/error.svg';
import React from 'react';

const NotFound = () => (
  <div className="flex-auto tc">
    <h1 className="f4 f3-ns mt0">404 - Page Not Found</h1>
    <img src={error} alt="Lesión" className={'h4 w4'} />
  </div>
);

export default NotFound;
