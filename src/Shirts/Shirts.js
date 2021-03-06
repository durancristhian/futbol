import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Shirt from './Shirt';

class Shirts extends PureComponent {
  static propTypes = {
    // eslint-disable-next-line
    shirts: PropTypes.arrayOf(Shirt.propTypes.shirt)
  };

  render() {
    const { shirts } = this.props;

    return (
      <div className="mv4 mv5-ns">
        <h2 className="f4 f3-ns mb4 mb5-ns mt0 normal tc">Historial de camisetas</h2>
        <div className="flex flex-wrap items-center justify-center">
          {shirts.map((shirt) => <Shirt key={shirt.Nombre} shirt={shirt} />)}
        </div>
      </div>
    );
  }
}

export default Shirts;
