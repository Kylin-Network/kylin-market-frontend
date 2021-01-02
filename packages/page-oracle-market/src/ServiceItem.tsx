import * as React from "react";
import styled from "styled-components";
import type { Service } from "./types";

interface Props {
  value: Service;
  className?: string;
}

function ServiceItem({ value, className = "" }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      <div className="ui--ServiceItem-badge">
        <img src={value.serviceThumb} />
      </div>

      <div className="ui--ServiceItem-info">
        <h4 className="ui--ServiceItem-name">{value.serviceName}</h4>
        <div className="ui--ServiceItem-desc">
          <div>#{value.serviceDataId}</div>
          <div>{value.serviceDesc}</div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(styled(ServiceItem)`
  width: 25%;
  display: flex;
  margin-bottom: 24px;
  .ui--ServiceItem-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #ffffff;
    & > img {
      display: block;
      max-width: 60% !important;
      height: auto !important;
      max-height: 55% !important;
    }
  }
  .ui--ServiceItem-info {
    padding: 0 16px;
  }
  .ui--ServiceItem-name {
    color: #e6007a;
    font-weight: 600;
    font-size: 16px;
  }
  .ui--ServiceItem-desc {
    color: #6a737d;
    word-break: break-word;
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.25;
  }
`);
