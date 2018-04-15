import Covers from '../Covers/Covers';
import Curiosities from '../Curiosities/Curiosities';
import Positions from '../Positions/Positions';
import PropTypes from 'prop-types';
import React from 'react';
import Shirts from '../Shirts/Shirts';

const Main = ({ positions, covers, curiosities, shirts }) => (
  <div className="ph3">
    <div className="center fade-in-up mw8">
      <Positions positions={positions} />
      <Covers covers={covers} />
      {shirts && shirts.length && <Shirts shirts={shirts} />}
      <Curiosities curiosities={curiosities} />
    </div>
  </div>
);

Main.propTypes = {
  covers: PropTypes.arrayOf(
    PropTypes.shape({
      Fecha: PropTypes.string.isRequired,
      Portada: PropTypes.string.isRequired
    })
  ),
  curiosities: PropTypes.arrayOf(
    PropTypes.shape({
      Descripcion: PropTypes.string.isRequired,
      Estadista: PropTypes.string.isRequired,
      Fecha: PropTypes.number.isRequired,
      Foto: PropTypes.string.isRequired
    })
  ),
  positions: PropTypes.arrayOf(
    PropTypes.shape({
      Empatados: PropTypes.number.isRequired,
      Ganados: PropTypes.number.isRequired,
      'Jugador/a': PropTypes.string.isRequired,
      Jugados: PropTypes.number.isRequired,
      Perdidos: PropTypes.number.isRequired,
      Puntos: PropTypes.number.isRequired
    })
  ),
  shirts: PropTypes.arrayOf(
    PropTypes.shape({
      Derrotas: PropTypes.number.isRequired,
      Empates: PropTypes.number.isRequired,
      Nombre: PropTypes.string.isRequired,
      Victorias: PropTypes.number.isRequired
    })
  )
};

export default Main;
