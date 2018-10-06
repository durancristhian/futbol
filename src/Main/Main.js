import React, { PureComponent } from 'react';
import Covers from '../Covers/Covers';
import Curiosities from '../Curiosities/Curiosities';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import Positions from '../Positions/Positions';
import Shirts from '../Shirts/Shirts';

class Main extends PureComponent {
  static propTypes = {
    // eslint-disable-next-line
    covers: Covers.propTypes.covers,
    // eslint-disable-next-line
    curiosities: Curiosities.propTypes.curiosities,
    // eslint-disable-next-line
    positions: Positions.propTypes.positions,
    // eslint-disable-next-line
    shirts: Shirts.propTypes.shirts
  };

  render() {
    const { positions, covers, curiosities, shirts } = this.props;

    return (
      <div className="fadeIn ph3">
        <div className="center mw8">
          <LeaderBoard leaders={positions.slice(0, 3)} />
          <Positions positions={positions} />
          {covers && covers.length > 0 && <Covers covers={covers} />}
          {shirts && shirts.length > 0 && <Shirts shirts={shirts} />}
          {curiosities && curiosities.length > 0 && <Curiosities curiosities={curiosities} />}
        </div>
      </div>
    );
  }
}

export default Main;
