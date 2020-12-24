// Copyright 2017-2020 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component from '@polkadot/app-explorer';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsAccounts: true,
      needsApi: []
    },
    group: 'network',
    icon: 'server',
    name: 'Oracle DataSource',
    text: t('nav.oracle_datasource', 'Oracle DataSource', { ns: 'apps-routing' })
  };
}
