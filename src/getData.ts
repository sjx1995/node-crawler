/*
 * @Author: Sunly
 * @Date: 2021-05-13 19:05:51
 * @LastEditTime: 2021-05-13 19:06:32
 * @LastEditors: Sunly
 * @Description: 爬取数据
 * @FilePath: \mo-yoo\crawler\src\getData.ts
 */
import { Crawler } from "./crawler";
import {
  ZhihuAnalyzer,
  HotData as ZhihuHotDataType,
} from "./analyzers/zhihuAnalyzer";
import {
  WeiboAnalyzer,
  HotData as WeiboHotDataType,
} from "./analyzers/weiboAnalyzer";
import {
  IfanrAnalyzer,
  HotData as IfanrHotDataType,
} from "./analyzers/ifanrAnalyzer";
import { KrAnalyzer, HotData as KrHotDataType } from "./analyzers/36krAnalyzer";
import {
  WoshipmAnalyzer,
  HotData as WoshipmHotDataType,
} from "./analyzers/woshipmAnalyzer";
import {
  SspaiAnalyzer,
  HotData as SspaiHotDataType,
} from "./analyzers/sspaiAnalyzer";
import {
  HuxiuAnalyzer,
  HotData as HuxiuHotDataType,
} from "./analyzers/huxiuAnalyzer";
import {
  GcoresAnalyzer,
  HotData as GcoresHotDataType,
} from "./analyzers/gcoresAnalyzer";
import {
  SmzdmAnalyzer,
  HotData as SmzdmHotDataTyle,
} from "./analyzers/smzdmAnalyzer";

export function getData() {
  // 知乎
  const zhihuUrl = "https://www.zhihu.com/billboard";
  const zhihuFileName = "zhihu";
  const zhihuAnalyzer = new ZhihuAnalyzer();
  new Crawler<ZhihuHotDataType>(zhihuUrl, zhihuFileName, zhihuAnalyzer);

  // 微博
  const weiboUrl = "https://s.weibo.com/top/summary?cate=realtimehot";
  const weiboFileName = "weibo";
  const weiboAnalyzer = new WeiboAnalyzer();
  new Crawler<WeiboHotDataType>(weiboUrl, weiboFileName, weiboAnalyzer);

  // ifanr
  const ifanrUrl = "https://www.ifanr.com";
  const ifanrFileName = "ifanr";
  const ifanrAnalyzer = new IfanrAnalyzer();
  new Crawler<IfanrHotDataType>(ifanrUrl, ifanrFileName, ifanrAnalyzer);

  // 36kr
  const krUrl = "https://36kr.com/";
  const krFileName = "36kr";
  const krAnalyer = new KrAnalyzer();
  new Crawler<KrHotDataType>(krUrl, krFileName, krAnalyer);

  // 少数派
  const sspaiUrl = "https://sspai.com/";
  const sspaiFileName = "sspai";
  const sspaiAnalyzer = new SspaiAnalyzer();
  new Crawler<SspaiHotDataType>(sspaiUrl, sspaiFileName, sspaiAnalyzer);

  // 人人都是产品经理
  const woshipmUrl = "http://www.woshipm.com/";
  const woshipmFileName = "woshipm";
  const woshipmAnalyzer = new WoshipmAnalyzer();
  new Crawler<WoshipmHotDataType>(woshipmUrl, woshipmFileName, woshipmAnalyzer);

  // 虎嗅
  const huxiuUrl = "https://www.huxiu.com/";
  const huxiuFileName = "huxiu";
  const huxiuAnalyzer = new HuxiuAnalyzer();
  new Crawler<HuxiuHotDataType>(huxiuUrl, huxiuFileName, huxiuAnalyzer);

  // 机核 - 文章
  const gcoresUrl = "https://www.gcores.com/articles";
  const gcoresFileName = "gcores";
  const gcoresAnalyzer = new GcoresAnalyzer();
  new Crawler<GcoresHotDataType>(gcoresUrl, gcoresFileName, gcoresAnalyzer);

  // 什么值得买 - 精选
  const smzdmUrl = "https://www.smzdm.com/jingxuan/";
  const smzdmFileName = "smzdm";
  const smzdmAnalyzer = new SmzdmAnalyzer();
  new Crawler<SmzdmHotDataTyle>(smzdmUrl, smzdmFileName, smzdmAnalyzer);
}
