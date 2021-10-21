/*
 * @Author: Sunly
 * @Date: 2021-04-13 08:51:40
 * @LastEditTime: 2021-04-14 12:14:08
 * @LastEditors: Sunly
 * @Description: 获取微博热搜
 * @FilePath: \mo-yoo\crawler\src\analyzers\weiboAnalyzer.ts
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
			let link = `https://s.weibo.com${$(element).children("a").attr("href")}`;
			hotData.push({ title, metrics, link });
		});
		return hotData;
	}
}
