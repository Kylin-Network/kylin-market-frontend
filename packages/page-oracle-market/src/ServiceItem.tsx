import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import type { Service } from "./types";

interface Props {
  value: Service;
  className?: string;
}

function ServiceItem({ value, className = "" }: Props): React.ReactElement<Props> {
  return (
    <Link className={className} to={`/marketplace/query/${value.serviceDataId}`}>
      <div className="ui--ServiceItem-badge">
        <img src={value.serviceThumb} />
      </div>

      <div className="ui--ServiceItem-info">
        <h4 className="ui--ServiceItem-name">{value.serviceName}</h4>
        <div>
          <div className="ui--ServiceItem-num">#{value.serviceDataId}</div>
          <div className="ui--ServiceItem-desc">{value.serviceDesc}</div>
        </div>
      </div>
    </Link>
  );
}

export default React.memo(styled(ServiceItem)`
  width: 25%;
  display: flex;
  margin-bottom: 32px;
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
  .ui--ServiceItem-num {
    color: rgba(78, 78, 78, 0.66);
    line-height: 1.5;
  }
  .ui--ServiceItem-desc {
    color: #4e4e4e;
    word-break: break-word;
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.25;
  }
`);
