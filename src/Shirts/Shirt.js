import PropTypes from 'prop-types';
import React from 'react';
import Tilt from 'react-tilt';

const Shirt = ({ shirt }) => (
  <div className="b--black-20 ba ma3 w-100 w-33-l">
    <h3 className="bg-black-10 mv0 ph3 pv2 tc">{shirt.Nombre}</h3>
    <div className="b--black-20 bg-white-60 bt pa3">
      <Tilt
        options={{
          axis: 'x',
          reverse: true,
          scale: '1.05'
        }}
      >
        <img
          src={require(`../assets/images/tshirt-${shirt.Nombre.toLowerCase()}.svg`)}
          alt={`Camiseta de ${shirt.Nombre}`}
          className="center db mw5"
        />
      </Tilt>
      <div className="flex justify-center tc">
        <div className="mh3">
          <p className="b f2 mv0">{shirt.Victorias}</p>
          <p className="black-50 mv0">Victoria{shirt.Victorias === 1 ? '' : 's'}</p>
        </div>
        <div className="mh3">
          <p className="b f2 mv0">{shirt.Empates}</p>
          <p className="black-50 mv0">Empate{shirt.Empates === 1 ? '' : 's'}</p>
        </div>
        <div className="mh3">
          <p className="b f2 mv0">{shirt.Derrotas}</p>
          <p className="black-50 mv0">Derrota{shirt.Derrotas === 1 ? '' : 's'}</p>
        </div>
      </div>
    </div>
  </div>
);

Shirt.propTypes = {
  Derrotas: PropTypes.number.isRequired,
  Empates: PropTypes.number.isRequired,
  Nombre: PropTypes.string.isRequired,
  Victorias: PropTypes.number.isRequired
};

export default Shirt;
