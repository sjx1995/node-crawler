/*
 * @Author: Sunly
 * @Date: 2021-04-14 17:11:01
 * @LastEditTime: 2021-04-15 18:51:44
 * @LastEditors: Sunly
 * @Description:
 * @FilePath: \mo-yoo\crawler\src\analyzers\gcoresAnalyzer.ts
 */
import cheerio from "cheerio";

interface GcoresAnalyzerType {
	getJsonData(html: string): HotData[];
}

export interface HotData {
	title: string;
	link: string;
}

export class GcoresAnalyzer implements GcoresAnalyzerType {
	getJsonData(html: string) {
		const hotData: HotData[] = [];
		const $ = cheerio.load(html);
		const articles = $(".original-article .original_content");
		articles.map((index, element) => {
			const title = $(element).children("h3").text();
			const link = `https://www.gcores.com${$(element).attr("href")}`;
			hotData.push({ title, link });
		});
		return hotData;
	}
}
