import error from '../assets/images/error.svg';
import React from 'react';

const NotFound = () => (
  <div className="flex-auto mv4 mv5-ns tc">
    <h2 className="f4 f3-ns normal tc">404 - Page Not Found</h2>
    <img src={error} alt="Lesión" className={'h4 w4'} />
  </div>
);

export default NotFound;
