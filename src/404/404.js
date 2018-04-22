import injury from './injury.svg';
import React from 'react';

const NotFound = () => (
  <div className="flex flex-auto flex-column items-center justify-center min-vh-100 pv4 pv5-ns tc">
    <h2 className="f4 f3-ns mb3 mt0 normal tc">404 - Page Not Found</h2>
    <img src={injury} alt="Lesión" className={'h3 h4-ns w3 w4-ns'} />
    <a href="/" className="color-inherit f7 f6-ns mt3" rel="noopener noreferrer">
      Volver a la página principal
    </a>
  </div>
);

export default NotFound;
