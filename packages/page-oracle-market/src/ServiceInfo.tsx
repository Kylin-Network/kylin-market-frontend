import type { BlockNumber } from '@polkadot/types/interfaces';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useApi, useCall } from '@polkadot/react-hooks';

function Entry (): React.ReactElement | null {
  const { api } = useApi();
  const bestNumber = useCall<BlockNumber>(api.derive.chain.bestNumber);
  const { value } = useParams<{ value: string }>();
  const [stateValue, setStateValue] = useState<string | undefined>(value);

  useEffect((): void => {
    setStateValue((stateValue) =>
      value && value !== stateValue
        ? value
        : !stateValue && bestNumber
          ? bestNumber.toString()
          : stateValue
    );
  }, [bestNumber, value]);

  if (!stateValue) {
    return null;
  }

  return (
    <div>service info</div>
  );
}

export default React.memo(Entry);
