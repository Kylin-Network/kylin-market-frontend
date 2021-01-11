import React, { useCallback, useState } from "react";
import styled from "styled-components";

import { Button, FilterOverlay, Input } from "@polkadot/react-components";
import { isHex } from "@polkadot/util";

import { useTranslation } from "./translate";

interface Props {
  className?: string;
  value?: string;
  onQuery?: () => void;
}

interface State {
  value: string;
  isValid: boolean;
}

function stateFromValue(value: string): State {
  return {
    isValid: isHex(value, 256) || /^\d+$/.test(value),
    value,
  };
}

function Query({ className = "", value: propsValue, onQuery }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [{ isValid, value }, setState] = useState(stateFromValue(propsValue || ""));

  const _setHash = useCallback((value: string): void => setState(stateFromValue(value)), []);

  const _onQuery = useCallback((): void => {
    if (isValid && value.length !== 0) {
      // fetch data
      onQuery && onQuery(value);
    }
  }, [isValid, value]);

  return (
    <FilterOverlay className={`ui--FilterOverlay ${className}`} showOnPhone>
      <Input
        className="dataSource--query"
        defaultValue={propsValue}
        isError={!isValid && value.length !== 0}
        onChange={_setHash}
        onEnter={_onQuery}
        placeholder={t<string>("data source ID to query")}
        withLabel={false}
      >
        <Button icon="play" onClick={_onQuery} />
      </Input>
    </FilterOverlay>
  );
}

export default React.memo(styled(Query)`
  .dataSource--query {
    width: 20em;
  }
`);
