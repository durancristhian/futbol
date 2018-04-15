import PropTypes from 'prop-types';
import React from 'react';
import Shirt from './Shirt';

const Shirts = ({ shirts }) => (
  <div className="mt4 mt5-ns">
    <h2 className="f4 f3-ns mt0 tc">Historial de camisetas</h2>
    <div className="flex flex-wrap items-center justify-center">
      {shirts.map((shirt, index) => <Shirt key={shirt.Nombre} shirt={shirt} index={index} />)}
    </div>
  </div>
);

Shirts.propTypes = {
  shirts: PropTypes.arrayOf(
    PropTypes.shape({
      Nombre: PropTypes.string.isRequired
    })
  )
};

export default Shirts;
