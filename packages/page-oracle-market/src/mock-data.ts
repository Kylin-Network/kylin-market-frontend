import type { Service } from "./types";
import {useAccountId, useApi, useFormField} from '@polkadot/react-hooks';
import useWeight from "@polkadot/app-contracts/useWeight";
import BN from "bn.js";
import {BN_ZERO} from "@polkadot/util";
import {getContractForAddress} from "@polkadot/app-contracts/Contracts/util";
import {useCallback, useState} from "react";

export function useServiceInfo (initialValue: Service[] = [], onChangeServices?: (_: Service[]) => void): [Service[], (_: Service[]) => void] {
  const [services, setServices] = useState<Service[]>(initialValue);
  const _setServices = useCallback(
    (services: Service[] = []): void => {
      setServices(services);

      onChangeServices && onChangeServices(services);
    },
    [onChangeServices]
  );

  return [services, _setServices];
}

export function initServiceInfo() {
  const [accountId] = useAccountId();
  const [services, setServices] = useServiceInfo();
  const { api } = useApi();
  const contract = getContractForAddress(api, "5D7VRXWDyZxj9HfPVcBcACPxesUJAMWoHtwaNbhVzcATdKTH")
  const weight = useWeight();
  const [value, isValueValid, setEndowment] = useFormField<BN>(BN_ZERO);

  if (!contract) {
    console.error("cannot find the target contract~");
    return
  }

  function queryInfo(messageIndex, params) {
    let message = contract.abi.messages[messageIndex];

    return contract
      .read(message, {gasLimit: weight.isEmpty ? -1 : weight.weight, value: message.isPayable ? value : 0}, ...params)
      .send(accountId)
  }

  for (let i = 1000000; i < 1000020; i++) {
    let params = [i];

    // let urls = await Promise.all([queryInfo(10, params), queryInfo(2, params)]);
    // 1 owner 2 name 3 desc 4 thumb
    Promise.all([queryInfo(2, params), queryInfo(3, params),
      queryInfo(4, params)])
      .then((result) => {
        console.info("promise all", result);
        for (let v of result) {
          if(!v || !v.output || v.result.isErr) {
            console.info("not found service", i);
            return
          }
        }
        let item = {
          serviceName: parseContractHex(result[0].output.toHex()),
          serviceDataId: i,
          serviceDesc: parseContractHex(result[1].output.toHex()),
          serviceThumb: parseContractHex(result[2].output.toHex()),
        };
        console.info("item", item);
        services.push(item);
        setServices(services);
      })
      .catch((error): void => {
        console.error(error);
      });
  }
}

function parseContractHex(hex: string): string {
  return fromHex("0x" + hex.substring(4));
}

function toHex(s) {
  var s = unescape(encodeURIComponent(s))
  var h = '0x'
  for (var i = 0; i < s.length; i++) {
    h += s.charCodeAt(i).toString(16)
  }
  return h
}

function fromHex(h) {
  var s = ''
  for (var i = 0; i < h.length; i+=2) {
    s += String.fromCharCode(parseInt(h.substr(i, 2), 16))
  }
  return decodeURIComponent(escape(s))
}

let data: Service[] = [];

for (let i = 10000; i < 10020; i++) {
  data.push({
    serviceName: `kylin-name-${i}`,
    serviceDataId: i,
    serviceDesc: `kylin-desc-${i}`,
    serviceThumb: "https://avatars0.githubusercontent.com/ml/30?s=62&v=4",
  });
}

export const serviceData = data;
