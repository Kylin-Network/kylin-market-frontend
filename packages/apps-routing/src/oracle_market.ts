// Copyright 2017-2020 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

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
    name: 'Oracle Market',
    text: t('nav.oracle_market', 'Oracle Market', { ns: 'apps-routing' })
  };
}
