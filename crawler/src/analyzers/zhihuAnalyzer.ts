/*
 * @Author: Sunly
 * @Date: 2021-04-13 08:22:03
 * @LastEditTime: 2021-04-13 18:40:19
 * @LastEditors: Sunly
 * @Description:
 * @FilePath: \web-crawler-typescript\src\zhihuAnalyzer.ts
 */
import cheerio from "cheerio";

interface AnalyzerType {
	getJsonData(html: string): HotData[];
}

interface HostItem {
	id: string;
	cardId: string;
	target: {
		titleArea: { text: string };
		metricsArea: { text: string };
		link: { url: string };
	};
}

export interface HotData {
	title: string;
	link: string;
	metrics: string;
}

export class ZhihuAnalyzer implements AnalyzerType {
	getJsonData(html: string) {
		const $ = cheerio.load(html);
		const res = $("script#js-initialData").html();
		let regRes: RegExpMatchArray | null = null;
		let hostList: HostItem[] | null = null;
		const hotData: HotData[] = [];
		if (res) regRes = res.match(/"hotList":(.*?),"guestFeeds"/);
		if (regRes) hostList = JSON.parse(regRes[1]);
		if (hostList && hostList.length) {
			hostList.forEach(item => {
				const title = item.target.titleArea.text;
				const link = item.target.link.url;
				const metrics = item.target.metricsArea.text;
				hotData.push({ title, link, metrics });
			});
		}
		return hotData;
	}
}
