import * as React from "react";
import type { Service } from "./types";
import { Columar } from "@polkadot/react-components";
import styled from "styled-components";
import ServiceItem from "./ServiceItem";

interface Props {
  services: Service[];
}

function Main({ services }: Props): React.ReactElement<Props> {
  return (
    <div>
      <Columar>
        {services.map(
          (service): React.ReactNode => (
            <ServiceItem key={service.serviceDataId} value={service} />
          )
        )}
      </Columar>
    </div>
  );
}

export default React.memo(styled(Main)`
  background-color: #fff;
`);
