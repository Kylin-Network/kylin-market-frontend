import * as React from "react";

import { Columar } from "@polkadot/react-components";
import ServiceItem from "./ServiceItem";
import { useServices } from "./mock-data";

interface Props {
  className?: string;
}

function Main({ className = "" }: Props): React.ReactElement<Props> {
  const [services] = useServices([]);
  console.log("marketplace services...", services);
  return (
    <Columar>
      {services.map(
        (service): React.ReactNode => (
          <ServiceItem key={service.serviceDataId} value={service} />
        )
      )}
    </Columar>
  );
}

export default React.memo(Main);
