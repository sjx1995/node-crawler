/*
 * @Author: Sunly
 * @Date: 2021-04-13 08:21:55
 * @LastEditTime: 2021-05-13 18:56:26
 * @LastEditors: Sunly
 * @Description: 发送请求，保存爬虫结果
 * @FilePath: \mo-yoo\crawler\src\crawler.ts
 */
import fs from "fs";
import path from "path";
import superagent from "superagent";

interface AnalyzerType<T> {
	getJsonData(html: string): T[];
}

export class Crawler<T> {
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
