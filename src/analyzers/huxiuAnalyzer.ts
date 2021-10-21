/*
 * @Author: Sunly
 * @Date: 2021-04-14 12:22:32
 * @LastEditTime: 2021-04-15 18:51:28
 * @LastEditors: Sunly
 * @Description: 获取虎嗅网号外及最新文章
 * @FilePath: \mo-yoo\crawler\src\analyzers\huxiuAnalyzer.ts
 */
import cheerio from "cheerio";

interface huxiuAnalyzerType {
	getJsonData(html: string): HotData[];
}

export interface HotData {
	title: string;
	link: string;
}

export class HuxiuAnalyzer implements huxiuAnalyzerType {
	getJsonData(html: string) {
		const hotData: HotData[] = [];
		const $ = cheerio.load(html);
		const recommend = $("#topLeft .recommend__right a");
		hotData.push({
			title: `号外：${$(recommend).children("h4").text()}`,
			link: `https://huxiu.com${$(recommend).attr("href")}`
		});
		const articles = $("#topLeft .article .article-item").children("a");
		articles.map((index, element) => {
			const title = $(element).children(".article-item__content").children("h5").text().replace(/\s+/g, "");
			const link = `https://huxiu.com${$(element).attr("href")}`;
			hotData.push({ title, link });
		});
		return hotData;
	}
}
