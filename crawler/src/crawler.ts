/*
 * @Author: Sunly
 * @Date: 2021-04-13 08:21:55
 * @LastEditTime: 2021-04-13 20:40:37
 * @LastEditors: Sunly
 * @Description:
 * @FilePath: \web-crawler-typescript\src\crawler.ts
 */
import fs from "fs";
import path from "path";
import superagent from "superagent";
import { ZhihuAnalyzer, HotData as ZhihuHotDataType } from "./analyzers/zhihuAnalyzer";
import { WeiboAnalyzer, HotData as WeiboHotDataType } from "./analyzers/weiboAnalyzer";
import { IfanrAnalyzer, HotData as IfanrHotDataType } from "./analyzers/ifanrAnalyzer";
import { KrAnalyzer, HotData as KrHotDataType } from "./analyzers/36kr";

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
