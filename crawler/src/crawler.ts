/*
 * @Author: Sunly
 * @Date: 2021-04-13 08:21:55
 * @LastEditTime: 2021-04-15 19:50:36
 * @LastEditors: Sunly
 * @Description: 发送请求，保存爬虫结果
 * @FilePath: \mo-yoo\crawler\src\crawler.ts
 */
import fs from "fs";
import path from "path";
import superagent from "superagent";
import { ZhihuAnalyzer, HotData as ZhihuHotDataType } from "./analyzers/zhihuAnalyzer";
import { WeiboAnalyzer, HotData as WeiboHotDataType } from "./analyzers/weiboAnalyzer";
import { IfanrAnalyzer, HotData as IfanrHotDataType } from "./analyzers/ifanrAnalyzer";
import { KrAnalyzer, HotData as KrHotDataType } from "./analyzers/36krAnalyzer";
import { WoshipmAnalyzer, HotData as WoshipmHotDataType } from "./analyzers/woshipmAnalyzer";
import { SspaiAnalyzer, HotData as SspaiHotDataType } from "./analyzers/sspaiAnalyzer";
import { HuxiuAnalyzer, HotData as HuxiuHotDataType } from "./analyzers/huxiuAnalyzer";
import { GcoresAnalyzer, HotData as GcoresHotDataType } from "./analyzers/gcoresAnalyzer";
import { SmzdmAnalyzer, HotData as SmzdmHotDataTyle } from "./analyzers/smzdmAnalyzer";

interface AnalyzerType<T> {
	getJsonData(html: string): T[];
}

class Crawler<T> {
	private jsonData: T[] = [];

	constructor(private url: string, private fileName: string, private analyzer: AnalyzerType<T>) {
		this.initCrawler();
	}

	private async getRawHTML() {
		const html = await superagent.get(this.url).set({
			"user-agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
		});
		this.jsonData = this.analyzer.getJsonData(html.text);
	}

	private saveData() {
		if (!fs.existsSync(path.resolve(__dirname, "../data"))) {
			fs.mkdirSync(path.resolve(__dirname, "../data"));
		}
		const filePath = path.resolve(__dirname, "../data", `${this.fileName}.json`);
		fs.writeFileSync(filePath, JSON.stringify(this.jsonData), "utf-8");
		console.log(`爬取 ${this.fileName} 成功`);
	}

	private async initCrawler() {
		await this.getRawHTML();
		this.saveData();
	}
}

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

// 掘金

// segmentFault

// 什么值得买 - 精选
const smzdmUrl = "https://www.smzdm.com/jingxuan/";
const smzdmFileName = "smzdm";

const smzdmAnalyzer = new SmzdmAnalyzer();
new Crawler<SmzdmHotDataTyle>(smzdmUrl, smzdmFileName, smzdmAnalyzer);

// v2ex

// 最新电影票房

// 最期待电影
