/*
 * @Author: Sunly
 * @Date: 2021-04-13 09:02:12
 * @LastEditTime: 2021-04-13 19:05:35
 * @LastEditors: Sunly
 * @Description:
 * @FilePath: \web-crawler-typescript\src\ifanrAnalyzer.ts
 */
import cheerio from "cheerio";

interface AnalyzerType {
	getJsonData(html: string): HotData[];
}

export interface HotData {
	title: string;
	link: string;
}

export class IfanrAnalyzer implements AnalyzerType {
	getJsonData(html: string) {
		const hotData: HotData[] = [];
		const $ = cheerio.load(html);
		const articles = $(".collection-list .article-item .article-info h3 a");
		articles.map((index, element) => {
			const title = $(element).text();
			const link = $(element).attr("href");
			hotData.push({ title, link: link ? link : "" });
		});
		return hotData;
	}
}
