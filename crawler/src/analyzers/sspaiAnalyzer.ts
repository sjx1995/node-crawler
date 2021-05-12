/*
 * @Author: Sunly
 * @Date: 2021-04-14 11:55:02
 * @LastEditTime: 2021-04-15 18:51:07
 * @LastEditors: Sunly
 * @Description: 获取少数派最新信息
 * @FilePath: \mo-yoo\crawler\src\analyzers\sspaiAnalyzer.ts
 */
import cheerio from "cheerio";

interface SspaiAnalyzerType {
	getJsonData(html: string): HotData[];
}

export interface HotData {
	title: string;
	link: string;
}

export class SspaiAnalyzer implements SspaiAnalyzerType {
	getJsonData(html: string) {
		const hotData: HotData[] = [];
		const $ = cheerio.load(html);
		const paper = $(".articleCard .pai_title").eq(0);
		hotData.push({
			title: "派早报 | " + paper.children(".time").children().first().text().replace(/\s+/g, ""),
			link: `https://sspai.com${paper.children(".link").children("a").attr("href")}`
		});
		const articles = $(".articleCard .card_content");
		articles.map((index, element) => {
			let title: string, link: string;
			if ($(element).children("a.pc_card").length) {
				title = $(element).children("a.pc_card").children("div.title").text().replace(/\s+/g, "");
				link = `https://sspai.com${$(element).children("a.pc_card").attr("href")}`;
				hotData.push({ title, link });
			}
			if ($(element).children(".card_con").children("a").length) {
				title = $(element).children(".card_con").children("a").children("div").text().replace(/\s+/g, "");
				link = `https://sspai.com${$(element).children(".card_con").children("a").attr("href")}`;
				hotData.push({ title, link });
			}
		});
		return hotData;
	}
}
