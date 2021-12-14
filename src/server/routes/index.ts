/*
 * @Description: express
 * @Author: Sunly
 * @Date: 2021-10-22 20:53:27
 */
import express from "express";
import { getSspaiData } from "../crawlers/sspai";
import { getIfanrData } from "../crawlers/ifanr";
import dayjs from "../../utils/localTime";

const app = express();

app.get("/sspai", async (req, res) => {
  const { startTime, limit } = req.query;
  const par_startTime = typeof startTime === "string" ? startTime : undefined;
  const par_limit = typeof limit === "string" ? limit : undefined;
  // get new content and set to database
  const data = await getSspaiData(par_startTime, par_limit);
  console.log(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] - 获取sspai信息`);
  res.status(200);
  res.json({ data });
});

app.get("/ifanr", async (req, res) => {
  const { startTime, limit } = req.query;
  const par_startTime = typeof startTime === "string" ? startTime : undefined;
  const par_limit = typeof limit === "string" ? limit : undefined;
  const data = await getIfanrData(par_startTime, par_limit);
  console.log(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] - 获取ifanr信息`);
  res.status(200);
  res.json({ data });
});

export { app };
