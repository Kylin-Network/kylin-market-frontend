import * as React from "react";
import type { Service } from "./types";
import { Columar, Column } from "@polkadot/react-components";

interface Props {
  services: Service[];
}

function ServiceItem() {
  return <div>service</div>;
}

function Main({ services }: Props): React.ReactElement<Props> {
  return (
    <>
      <Columar>
        <Column>
          {services.map((service) => (
            <ServiceItem key={service.serviceDataId} />
          ))}
        </Column>
      </Columar>
    </>
  );
}

export default React.memo(Main);
