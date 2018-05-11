import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import LazyLoad from 'react-lazyload';
import Tilt from 'react-tilt';

class Shirt extends PureComponent {
  static propTypes = {
    shirt: PropTypes.shape({
      Derrotas: PropTypes.number.isRequired,
      Empates: PropTypes.number.isRequired,
      Nombre: PropTypes.string.isRequired,
      Victorias: PropTypes.number.isRequired
    })
  };

  render() {
    const { shirt } = this.props;

    return (
      <div className="b--black-20 ba mv3 mh3-l mv0-l w-100 w-33-l">
        <h3 className="bg-black-10 mv0 normal ph3 pv2 tc">{shirt.Nombre}</h3>
        <div className="b--black-20 bg-white-60 bt pa3">
          <Tilt
            options={{
              axis: 'x',
              reverse: true,
              scale: '1.05'
            }}
          >
            <LazyLoad height="100%" once={true}>
              <img
                src={require(`./${shirt.Nombre.toLowerCase()}.svg`)}
                alt={`Camiseta de ${shirt.Nombre}`}
                title={`Camiseta de ${shirt.Nombre}`}
                className="center db mw5"
              />
            </LazyLoad>
          </Tilt>
          <div className="flex justify-center tc">
            <div className="mh3">
              <p className="b f2 mv0">{shirt.Victorias}</p>
              <p className="black-50 mv0">Victoria{shirt.Victorias !== 1 && 's'}</p>
            </div>
            <div className="mh3">
              <p className="b f2 mv0">{shirt.Empates}</p>
              <p className="black-50 mv0">Empate{shirt.Empates !== 1 && 's'}</p>
            </div>
            <div className="mh3">
              <p className="b f2 mv0">{shirt.Derrotas}</p>
              <p className="black-50 mv0">Derrota{shirt.Derrotas !== 1 && 's'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Shirt;
