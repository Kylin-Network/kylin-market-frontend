import type { Service } from "./types";
import React, { useRef, useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import Tabs from "@polkadot/react-components/Tabs";
import { useApi } from "@polkadot/react-hooks";

import { useTranslation } from "./translate";
import Main from "./Main";
import ServiceInfo from "./ServiceInfo";
import { serviceData } from "./mock-data";

type Services = Service[];

interface Props {
  basePath: string;
  className?: string;
}

function OracleMarketApp({ basePath, className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const itemsRef = useRef([
    {
      isRoot: true,
      name: "services",
      text: t<string>("Services"),
    },
    {
      hasParams: true,
      name: "query",
      text: t<string>("Service details"),
    },
  ]);
  const [services, setServices] = useState<Services>([]);

  useEffect((): void => {
    api.isReady
      .then((): void => {
        // fetch and set services
        setServices(serviceData);
      })
      .catch(console.error);
  }, []);

  return (
    <main className={className}>
      <header>
        <Tabs basePath={basePath} items={itemsRef.current} />
      </header>
      <Switch>
        <Route path={`${basePath}/query/:value`}>
          <ServiceInfo />
        </Route>
        <Route>
          <Main services={services} />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(OracleMarketApp);
