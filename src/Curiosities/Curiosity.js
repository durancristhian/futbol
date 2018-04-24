import { getPlayerImage } from '../utils/getPlayerImage';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class Curiosity extends PureComponent() {
  static propTypes = {
    curiosity: PropTypes.shape({
      Descripcion: PropTypes.string.isRequired,
      Estadista: PropTypes.string.isRequired,
      Fecha: PropTypes.number.isRequired,
      Foto: PropTypes.string.isRequired
    }),
    index: PropTypes.number.isRequired
  };

  render() {
    const { curiosity, index } = this.props;

    return (
      <div className="pv3 pa3-l w-100 w-50-m w-33-l">
        <div className={`${index % 2 ? 'ml2-m' : 'mr2-m'} ma0-l`}>
          <p className="b--black-20 bl br bt bg-white-60 mv0 pa3">"{curiosity.Descripcion}"</p>
          <div className="b--black-20 ba bg-black-10 flex items-center ph3 pv2">
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
  }
}

export default Curiosity;
