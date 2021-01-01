import type { Service } from "./types";

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
