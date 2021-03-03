import type { Service } from "./types";
import { useAccountId, useApi, useFormField } from "@polkadot/react-hooks";
import useWeight from "@polkadot/app-contracts/useWeight";
import BN from "bn.js";
import { BN_ZERO } from "@polkadot/util";
import { getContractForAddress } from "@polkadot/app-contracts/Contracts/util";
import { useState, useEffect } from "react";
import store from "store";

export function useServices(initialValue: Service[] = []) {
  const [accountId] = useAccountId();
  const [services, setServices] = useState<Service[]>(initialValue);
  const { api } = useApi();
  let innerTypes = store.get('types');
  const contract: any = getContractForAddress(api, innerTypes?.OracleMarketAddress);
  const weight = useWeight();
  const [value] = useFormField<BN>(BN_ZERO);

  if (!contract) {
    console.error("cannot find the target contract~");
    return [services];
  }

  useEffect(() => {
    async function queryInfo(messageIndex: number, params: number[]) {
      let message = contract.abi.messages[messageIndex];
      const data = {
        gasLimit: weight.isEmpty ? -1 : weight.weight,
        value: message.isPayable ? value : 0,
      };
      return await contract.read(message, data, ...params).send(accountId);
    }

    function validResult(result): boolean{
      for (let v of result) {
        if (!v || !v.output || v.result.isErr) {
          return false;
        }
      }
      return true;
    }

    async function initialServices() {
      let items: Service[] = [];
      for (let i = 1000000; i < 1000020; i++) {
        let params = [i];
        // let urls = await Promise.all([queryInfo(10, params), queryInfo(2, params)]);
        // 1 owner 2 name 3 desc 4 thumb
        const result = await Promise.all([queryInfo(2, params), queryInfo(3, params), queryInfo(4, params)]);
        if (!validResult(result)) {
          console.info("not found service", i);
          continue
        }
        let item = {
          serviceName: parseContractHex(result[0].output.toHex()),
          serviceDataId: i,
          serviceDesc: parseContractHex(result[1].output.toHex()),
          serviceThumb: parseContractHex(result[2].output.toHex()),
        };
        console.info("item", item);
        items.push(item);
      }
      for (let i = 10000000; i < 10000020; i++) {
        let params = [i];
        // let urls = await Promise.all([queryInfo(10, params), queryInfo(2, params)]);
        // 1 owner 2 name 3 desc 4 thumb
        const result = await Promise.all([queryInfo(2, params), queryInfo(3, params), queryInfo(4, params)]);
        if (!validResult(result)) {
          console.info("not found service", i);
          continue
        }
        let item = {
          serviceName: parseContractHex(result[0].output.toHex()),
          serviceDataId: i,
          serviceDesc: parseContractHex(result[1].output.toHex()),
          serviceThumb: parseContractHex(result[2].output.toHex()),
        };
        console.info("item", item);
        items.push(item);
      }
      setServices(items);
    }
    initialServices();
  }, []);

  return [services];
}

export function useService(query: number) {
  const [accountId] = useAccountId();
  const [service, setService] = useState<Service>();
  const { api } = useApi();
  let innerTypes = store.get('types');
  const contract: any = getContractForAddress(api, innerTypes?.OracleMarketAddress);
  const weight = useWeight();
  const [value] = useFormField<BN>(BN_ZERO);

  if (!contract) {
    console.error("cannot find the target contract~");
    return [service];
  }

  useEffect(() => {
    async function queryInfo(messageIndex: number, params: number[]) {
      let message = contract.abi.messages[messageIndex];
      const data = {
        gasLimit: weight.isEmpty ? -1 : weight.weight,
        value: message.isPayable ? value : 0,
      };
      return await contract.read(message, data, ...params).send(accountId);
    }

    async function fetchServiceDetail() {
      let params = [query];
      const result = await Promise.all([queryInfo(2, params), queryInfo(3, params), queryInfo(4, params)]);
      for (let v of result) {
        if (!v || !v.output || v.result.isErr) {
          console.info("not found service", query);
          return;
        }
      }
      let item = {
        serviceName: parseContractHex(result[0].output.toHex()),
        serviceDataId: query,
        serviceDesc: parseContractHex(result[1].output.toHex()),
        serviceThumb: parseContractHex(result[2].output.toHex()),
      };
      setService(item);
    }
    fetchServiceDetail();
  }, []);

  return [service];
}

function parseContractHex(hex: string): string {
  return fromHex("0x" + hex.substring(4));
}

function toHex(str: any) {
  var s = unescape(encodeURIComponent(str));
  var h = "0x";
  for (var i = 0; i < s.length; i++) {
    h += s.charCodeAt(i).toString(16);
  }
  return h;
}

function fromHex(h) {
  var s = "";
  for (var i = 0; i < h.length; i += 2) {
    s += String.fromCharCode(parseInt(h.substr(i, 2), 16));
  }
  return decodeURIComponent(escape(s));
}
