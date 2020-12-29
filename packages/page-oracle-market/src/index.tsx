import type { KeyedEvent } from '@polkadot/react-query/types';
import * as React from 'react';

import { useTranslation } from './translate';

interface Props {
  basePath: string;
  className?: string;
  newEvents?: KeyedEvent[];
}

function OracleMarketApp({ basePath, className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  return <main className={className}>{t("page oracle market")}</main>;
}

export default React.memo(OracleMarketApp);
