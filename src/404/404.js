import error from '../assets/images/error.svg';
import React from 'react';

const NotFound = () => (
  <div className="flex flex-auto flex-column justify-center items-center">
    <h1>404 - Page Not Found</h1>
    <img src={error} alt="Lesión" className={'h4 w4'} />
  </div>
);

export default NotFound;
