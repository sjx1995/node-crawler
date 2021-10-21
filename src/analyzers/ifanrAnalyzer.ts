/*
 * @Author: Sunly
 * @Date: 2021-04-13 08:02:12
 * @LastEditTime: 2021-04-15 18:51:17
 * @LastEditors: Sunly
 * @Description: 获取爱范儿最近信息
 * @FilePath: \mo-yoo\crawler\src\analyzers\ifanrAnalyzer.ts
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
			const link = $(element).attr("href") as string;
			hotData.push({ title, link });
		});
		return hotData;
	}
}
