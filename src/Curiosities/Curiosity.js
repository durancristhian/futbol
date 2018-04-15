import { getPlayerImage } from '../utils/getPlayerImage';
import PropTypes from 'prop-types';
import React from 'react';

const Curiosity = ({ curiosity, index }) => {
  return (
    <div className="pv3 pa3-l w-100 w-50-m w-33-l">
      <div className={index % 2 ? 'ml2-m ml0-l' : 'mr2-m mr0-l'}>
        <p className="mb3 mt0">"{curiosity.Descripcion}"</p>
        <div className="flex items-center">
          <div className="mr3">
            <div
              className="bg-center cover h2 w2"
              style={{ backgroundImage: `url('${getPlayerImage(curiosity.Foto)}'` }}
            />
          </div>
          <div className="f6 flex-auto">
            <span className="b">{curiosity.Estadista}</span>, Fecha {curiosity.Fecha}.
          </div>
        </div>
      </div>
    </div>
  );
};

Curiosity.propTypes = {
  curiosity: PropTypes.shape({
    Descripcion: PropTypes.string.isRequired,
    Estadista: PropTypes.string.isRequired,
    Fecha: PropTypes.number.isRequired,
    Foto: PropTypes.string.isRequired
  }),
  index: PropTypes.number.isRequired
};

export default Curiosity;
