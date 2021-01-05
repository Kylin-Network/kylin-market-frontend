import React, { useState } from "react";
import styled from "styled-components";

import Query from "./Query";
import type { DataSource } from "./types";

interface Props {
  className?: string;
}

function Main({ className = "" }: Props): React.ReactElement<Props> | null {
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

  if (!Object.keys(dataSource).length) {
    return (
      <div className={className}>
        <Query onQuery={_onQuery} />
      </div>
    );
  }

  return (
    <div className={className}>
      <Query onQuery={_onQuery} />
      <div className="ui--dataSource">
        <div className="ui--dataSource--header">
          <div>id</div>
          <div>url</div>
          <div>data</div>
        </div>
        <div className="ui--dataSource--body">
          <div>{dataSource.dataId}</div>
          <a href={dataSource.url}>{dataSource.url}</a>
          <div>{dataSource.data}</div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(styled(Main)`
  .ui--dataSource {
    background-color: #fff;
    border: 1px solid #eeecea;
    padding: 24px;
  }
  .ui--dataSource--header,
  .ui--dataSource--body {
    display: flex;
    justify-content: space-between;
    text-align: left;
  }
  .ui--dataSource--header {
    color: rgba(78, 78, 78, 0.66);
  }
  .ui--dataSource--body {
    padding-top: 16px;
    color: #4c4c4c;
  }
`);
