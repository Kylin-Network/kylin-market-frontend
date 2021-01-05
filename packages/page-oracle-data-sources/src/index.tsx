import * as React from "react";
import { useRef } from "react";
import Tabs from "@polkadot/react-components/Tabs";

import { useTranslation } from "./translate";
import Main from "./Main";

interface Props {
  basePath: string;
  className?: string;
}

function OracleDataSources({ basePath, className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const itemsRef = useRef([
    {
      isRoot: true,
      name: "overview",
      text: t<string>("Data source"),
    },
  ]);
  return (
    <main className={className}>
      <header>
        <Tabs basePath={basePath} items={itemsRef.current} />
      </header>
      <Main />
    </main>
  );
}

export default React.memo(OracleDataSources);
