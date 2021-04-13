/*
 * @Author: Sunly
 * @Date: 2021-04-13 19:01:34
 * @LastEditTime: 2021-04-13 19:20:19
 * @LastEditors: Sunly
 * @Description:
 * @FilePath: \web-crawler-typescript\src\analyzers\36kr.ts
 */
import cheerio from "cheerio";

interface KrAnalyzerType {
	getJsonData(html: string): HotData[];
}

export interface HotData {
	title: string;
	link: string;
}

export class KrAnalyzer implements KrAnalyzerType {
	getJsonData(html: string) {
		const hotData: HotData[] = [];
		const $ = cheerio.load(html);
		const articles = $(
			".kr-home-flow-list .kr-home-flow-item .kr-shadow-content .article-item-info a.article-item-title"
		);
		articles.map((index, element) => {
			const title = $(element).text();
			const link = $(element).attr("href");
			hotData.push({ title, link: link ? `https://36kr.com${link}` : "" });
		});
		return hotData;
	}
}
