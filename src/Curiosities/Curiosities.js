import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Curiosity from './Curiosity';

class Curiosities extends PureComponent {
  static propTypes = {
    // eslint-disable-next-line
    curiosities: PropTypes.arrayOf(Curiosity.propTypes.curiosity).isRequired
  };

  render() {
    const { curiosities } = this.props;

    return (
      <div className="mv4 mv5-ns">
        <h2 className="f4 f3-ns mb4 mb5-ns mt0 normal tc">Curiosidades</h2>
        <div className="flex flex-wrap nl3-l nr3-l">
          {curiosities.map((curiosity, index) => (
            <Curiosity key={curiosity.Descripcion} curiosity={curiosity} index={index} />
          ))}
        </div>
      </div>
    );
  }
}

export default Curiosities;
