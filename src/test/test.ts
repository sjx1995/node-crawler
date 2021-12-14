/*
 * @Description:
 * @Author: Sunly
 * @Date: 2021-10-26 18:47:05
 */
import fs from "fs";
import path from "path";
import { axios } from "../server/httpRequest/axios";

axios<string>("https://s.weibo.com/top/summary?cate=realtimehot", "get").then(
  (data) => {
    fs.writeFileSync(path.resolve(__dirname, "./ifanr.txt"), data, {
      encoding: "utf-8",
    });
  }
);
