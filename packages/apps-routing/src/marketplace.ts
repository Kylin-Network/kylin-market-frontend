import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component from '@polkadot/app-oracle-market';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsAccounts: true,
      needsApi: []
    },
    group: 'network',
    icon: 'map-marked-alt',
    name: 'marketplace',
    text: t('nav.oracle-marketplace', 'Oracle marketplace', { ns: 'apps-routing' })
  };
}
