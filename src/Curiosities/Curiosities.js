import Curiosity from './Curiosity';
import PropTypes from 'prop-types';
import React from 'react';

const Curiosities = ({ curiosities }) => (
  <div className="mt4 mt5-ns">
    <h2 className="f4 f3-ns mt0 tc">Curiosidades</h2>
    <div className="flex flex-wrap justify-between nl3-l nr3-l">
      {curiosities.map((curiosity, index) => (
        <Curiosity key={curiosity.Descripcion} curiosity={curiosity} index={index} />
      ))}
    </div>
  </div>
);

Curiosities.propTypes = {
  curiosities: PropTypes.arrayOf(
    PropTypes.shape({
      Descripcion: PropTypes.string.isRequired
    })
  )
};

export default Curiosities;
