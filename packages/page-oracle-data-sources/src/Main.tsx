import React, { useState } from "react";
import styled from "styled-components";

import Query from "./Query";
import type { DataSource } from "./types";

interface Props {
  className?: string;
}

function Main({ className = "" }: Props): React.ReactElement<Props> {
  const [dataSource, setDataSource] = useState<DataSource>({});
  console.log("dataSource...", dataSource);

  const _onQuery = (): void => {
    // fetch data
    setDataSource({
      dataId: 1000000,
      url: "https://xxx.com/xxx",
      data: "4000",
    });
  };

  return (
    <div className={className}>
      <Query onQuery={_onQuery} />
      <div className="ui--dataSources">
        <div>{dataSource.dataId}</div>
        <div>{dataSource.url}</div>
        <div>{dataSource.data}</div>
      </div>
    </div>
  );
}

export default React.memo(styled(Main)`
  .ui--dataSources {
    background-color: #fff;
  }
`);
