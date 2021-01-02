import * as React from "react";

import { Columar } from "@polkadot/react-components";
import type { Service } from "./types";
import ServiceItem from "./ServiceItem";

interface Props {
  services: Service[];
  className?: string;
}

function Main({ services, className = "" }: Props): React.ReactElement<Props> {
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
