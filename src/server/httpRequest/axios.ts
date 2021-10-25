/*
 * @Description: 封装axios
 * @Author: Sunly
 * @Date: 2021-10-21 00:28:37
 */
import Axios from "axios";
import type { Method } from "axios";

const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36";

export const axios: <T>(url: string, method: Method) => Promise<T> = (
  url,
  method
) => {
  return new Promise((resolve, reject) => {
    Axios({
      url,
      method,
      headers: { "User-Agent": userAgent },
    })
      .then(({ data }) => {
        resolve(data as any);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
