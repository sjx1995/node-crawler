/*
 * @Author: Sunly
 * @Date: 2021-04-15 19:35:13
 * @LastEditTime: 2021-04-15 19:52:16
 * @LastEditors: Sunly
 * @Description:
 * @FilePath: \mo-yoo\crawler\src\analyzers\smzdmAnalyzer.ts
 */
import cheerio from "cheerio";

interface SmzdmAnalyzerType {
	getJsonData(html: string): HotData[];
}

export interface HotData {
	title: string;
	link: string;
	price: string;
}

export class SmzdmAnalyzer implements SmzdmAnalyzerType {
	getJsonData(html: string) {
		const hotData: HotData[] = [];
		const $ = cheerio.load(html);
		const articles = $("ul#feed-main-list li.J_feed_za .z-feed-content");
		articles.map((index, element) => {
			const title = $(element).children(".feed-block-title").children("a").text().replace(/\s+/g, "");
			const price = $(element).children("a").text().replace(/\s+/g, "");
			const link = $(element).children("a").attr("href") as string;
			hotData.push({ title, link, price });
		});
		return hotData;
	}
}
