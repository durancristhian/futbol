import Covers from '../Covers/Covers';
import Curiosities from '../Curiosities/Curiosities';
import Positions from '../Positions/Positions';
import React from 'react';
import Shirts from '../Shirts/Shirts';
import * as styles from './Main.module.css';

const Main = ({ positions, covers, curiosities, shirts }) => (
  <div className="ph3">
    <div className={`center ${styles.fadeInUp} mw8`}>
      <Positions positions={positions} />
      <Covers covers={covers} />
      {shirts && shirts.length && <Shirts shirts={shirts} />}
      <Curiosities curiosities={curiosities} />
    </div>
  </div>
);

Main.propTypes = {
  covers: Covers.propTypes.covers,
  curiosities: Curiosities.propTypes.curiosities,
  positions: Positions.propTypes.positions,
  shirts: Shirts.propTypes.shirts
};

export default Main;
