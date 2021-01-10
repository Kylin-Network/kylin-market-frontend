import React, { useState } from "react";
import styled from "styled-components";

import Query from "./Query";
import type { DataSource } from "./types";
import {useApi} from "@polkadot/react-hooks";

interface Props {
  className?: string;
}

function Main({ className = "" }: Props): React.ReactElement<Props> | null {
  const [dataSource, setDataSource] = useState<DataSource>({});
  console.log("dataSource...", dataSource);
  const { api } = useApi();
  const _onQuery = (): void => {
    // fetch data
    console.info("api info", api, api.query.kylinOcwModule);
    if (!api.query.kylinOcwModule || !api.query.kylinOcwModule.requestedOffchainData) {
      // not found kylinOcwModule modules
      return
    }
    // replace dataId
    let dataId = 10000001;
    api.query.kylinOcwModule.requestedOffchainData(dataId).then((res) => {
      console.info("requestedOffchainData", res);
      setDataSource({
        dataId: dataId,
        url: res["url"].toString(),
        data: res["data"].toString(),
      });
      console.info("DataSource", res["url"].toString(), res["data"].toString());
    }).catch(console.error);
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
