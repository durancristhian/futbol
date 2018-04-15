import PropTypes from 'prop-types';
import React from 'react';

const Cover = ({ cover, index, onClick }) => (
  <div className="pv3 pa3-l w-100 w-50-m w-33-l">
    <div className={index % 2 ? 'ml2-m ml0-l' : 'mr2-m mr0-l'}>
      <p className="mb2 mt0 tc">{cover.Fecha}</p>
      <img
        src={cover.Portada}
        alt={`Tapa de Olé - ${cover.Fecha}`}
        className="db center mh-100 zoom-in"
        onClick={(event) => onClick(event, index)}
      />
    </div>
  </div>
);

Cover.propTypes = {
  cover: PropTypes.shape({
    Fecha: PropTypes.string.isRequired,
    Portada: PropTypes.string.isRequired
  }),
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Cover;
