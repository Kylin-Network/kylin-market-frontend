import type { KeyedEvent } from '@polkadot/react-query/types';
import * as React from 'react';

import { HeaderExtended } from '@polkadot/api-derive';
import { Columar, Column } from '@polkadot/react-components';

interface Props {
  events: KeyedEvent[];
  headers: HeaderExtended[];
}

function Main (): React.ReactElement<Props> {
  return (
    <>
      <Columar>
        <Column>
          data sources
        </Column>
      </Columar>
    </>
  );
}

export default React.memo(Main);
