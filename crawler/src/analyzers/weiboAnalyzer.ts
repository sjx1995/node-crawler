/*
 * @Author: Sunly
 * @Date: 2021-04-13 08:51:40
 * @LastEditTime: 2021-04-13 19:23:05
 * @LastEditors: Sunly
 * @Description:
 * @FilePath: \web-crawler-typescript\src\analyzers\weiboAnalyzer.ts
 */
import cheerio from "cheerio";

interface AnalyzerType {
	getJsonData(html: string): HotData[];
}

export interface HotData {
	title: string;
	metrics: string;
	link: string;
}

export class WeiboAnalyzer implements AnalyzerType {
	getJsonData(html: string) {
		const hotData: HotData[] = [];
		const $ = cheerio.load(html);
		const tds = $("table tr td.td-02");
		tds.map((index, element) => {
			const title = $(element).children("a").text();
			const metrics = $(element).children("span").text();
			let link = $(element).children("a").attr("href");
			hotData.push({ title, metrics, link: link ? `https://s.weibo.com${link}` : "" });
		});
		return hotData;
	}
}
