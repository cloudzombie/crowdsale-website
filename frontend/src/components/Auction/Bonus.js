import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Statistic } from 'semantic-ui-react';

import auctionStore from '../../stores/auction.store';

@observer
export default class Bonus extends Component {
  render () {
    const { BONUS_SIZE, inBonus } = auctionStore;

    return (
      <Statistic>
        <Statistic.Label>Bonus</Statistic.Label>
        <Statistic.Value>
          {
            inBonus
              ? `${BONUS_SIZE.toNumber()}%`
              : '0%'
          }
        </Statistic.Value>
      </Statistic>
    );
  }
}
