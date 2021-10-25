/*
 * @Description: express
 * @Author: Sunly
 * @Date: 2021-10-22 20:53:27
 */
import express from "express";
import { getData } from "../crawlers/sspai";
import dayjs from "../../utils/localTime";

const app = express();

app.get("/sspai", async (req, res) => {
  // get new content and set to database
  const data = await getData();
  console.log(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] - 获取sspai信息`);
  res.status(200);
  res.json({ data });
});

export { app };
