import * as React from "react";
import styled from "styled-components";
import type { Service } from "./types";

interface Props {
  value: Service;
}

function ServiceItem({ value }: Props): React.ReactElement<Props> {
  return (
    <div>
      <img src={value.serviceThumb} />
      <div>{value.serviceDataId}</div>
      <div>{value.serviceName}</div>
      <div>{value.serviceDesc}</div>
    </div>
  );
}

export default React.memo(styled(ServiceItem)`
  width: 300px;
`);
