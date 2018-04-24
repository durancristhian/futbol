import Covers from '../Covers/Covers';
import Curiosities from '../Curiosities/Curiosities';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import Positions from '../Positions/Positions';
import React, { PureComponent } from 'react';
import Shirts from '../Shirts/Shirts';

class Main extends PureComponent {
  static propTypes = {
    covers: Covers.propTypes.covers,
    curiosities: Curiosities.propTypes.curiosities,
    positions: Positions.propTypes.positions,
    shirts: Shirts.propTypes.shirts
  };

  render() {
    const { positions, covers, curiosities, shirts } = this.props;

    return (
      <div className="fadeIn ph3">
        <div className="center mw8">
          <LeaderBoard leaders={positions.slice(0, 3)} />
          <Positions positions={positions} />
          <Covers covers={covers} />
          {shirts && shirts.length && <Shirts shirts={shirts} />}
          <Curiosities curiosities={curiosities} />
        </div>
      </div>
    );
  }
}

export default Main;
