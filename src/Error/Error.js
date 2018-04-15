import PropTypes from 'prop-types';
import React from 'react';

const Error = ({ message }) => (
  <div className="ph3 pv4 pv5-ns">
    <div className="center mw8">
      <p className="black-50 mv0 tc">{message}</p>
    </div>
  </div>
);

Error.defaultProps = {
  message: 'Ocurrió un error.'
};

Error.propTypes = {
  message: PropTypes.string
};

export default Error;
