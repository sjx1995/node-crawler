/*
 * @Author: Sunly
 * @Date: 2021-04-14 12:06:40
 * @LastEditTime: 2021-04-14 12:17:20
 * @LastEditors: Sunly
 * @Description: 获取人人都是产品经理最新文章
 * @FilePath: \mo-yoo\crawler\src\analyzers\woshipmAnalyzer.ts
 */
import cheerio from "cheerio";

interface WoshipmAnalyzerType {
	getJsonData(html: string): HotData[];
}

export interface HotData {
	title: string;
	link: string;
}

export class WoshipmAnalyzer implements WoshipmAnalyzerType {
	getJsonData(html: string) {
		const hotData: HotData[] = [];
		const $ = cheerio.load(html);
		const articles = $(".js-postlist .postlist-item .content h2.post-title a");
		articles.map((index, element) => {
			const title = $(element).attr("title") as string;
			const link = $(element).attr("href") as string;
			hotData.push({ title, link });
		});
		return hotData;
	}
}
