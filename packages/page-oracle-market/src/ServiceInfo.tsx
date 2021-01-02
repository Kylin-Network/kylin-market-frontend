import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "@polkadot/react-hooks";
import styled from "styled-components";
import { Columar } from "@polkadot/react-components";

interface Props {
  className?: string;
}

function ServiceInfo({ className = "" }: Props): React.ReactElement<Props> | null {
  const { api } = useApi();
  const { value } = useParams<{ value: string }>();
  const [stateValue, setStateValue] = useState<string | undefined>(value);

  useEffect((): void => {
    if (value && value !== stateValue) {
      setStateValue(value);
      api.isReady
        .then((): void => {
          // fetch and set service detail
        })
        .catch(console.error);
    }
  }, [value]);

  if (!stateValue) {
    return null;
  }

  return (
    <Columar className={className}>
      <div className="ui--ServiceInfo-left">
        <div className="ui--ServiceInfo-badge">
          <img src="https://avatars0.githubusercontent.com/ml/30?s=62&v=4" />
        </div>
      </div>
      <div className="ui--ServiceInfo-right">
        <div className="ui--ServiceInfo-name">kylin-name-{stateValue}</div>
        <div className="ui--ServiceInfo-desc">kylin-desc-{stateValue}</div>
      </div>
    </Columar>
  );
}

export default React.memo(styled(ServiceInfo)`
  margin-top: 64px;
  .ui--ServiceInfo-left {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .ui--ServiceInfo-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 128px;
    height: 128px;
    border-radius: 50%;
    background-color: #ffffff;
    & > img {
      display: block;
      max-width: 60% !important;
      height: auto !important;
      max-height: 55% !important;
    }
  }
  .ui--ServiceInfo-right {
    width: 50%;
  }
  .ui--ServiceInfo-name {
    color: #e6007a;
    font-weight: 300;
    font-size: 48px;
    line-height: 1.25;
  }
  .ui--ServiceInfo-desc {
    padding-top: 16px;
    font-size: 16px;
    line-height: 1.5;
    font-size: 16px;
    color: #4e4e4e;
    margin-bottom: 24px;
  }
`);
