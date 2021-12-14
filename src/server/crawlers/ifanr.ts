/*
 * @Description: 获取ifanr新闻
 * @Author: Sunly
 * @Date: 2021-10-25 20:38:06
 */
import cheerio from "cheerio";
import { Op } from "sequelize";
import { axios } from "../httpRequest/axios";
import { websitesConfig } from "../../config/websites.config";
import type { IContent } from "../../types/models.data";
import { sequelize } from "../../sequelize";
import dayjs from "../../utils/localTime";

const sspai = websitesConfig.find((website) => website.name === "爱范儿")!;
const { id, url } = sspai;

let timeLimit = 0;

export async function getIfanrData(
  startTime?: string,
  limit?: string
): Promise<IContent[]> {
  if (dayjs().valueOf() - timeLimit > 10 * 60 * 1000) {
    if (url) {
      // find latest content
      const content = (await sequelize.models.content.findOne({
        where: {
          websiteId: id,
        },
        order: [["updatedAt", "DESC"]],
      })) as unknown as IContent;
      let latestContentUrl = "";
      let latestContentTime = 0;
      if (content) {
        latestContentUrl = content.link;
        latestContentTime = dayjs(content.updatedAt).unix();
      }

      const htmlStr = await axios<string>(url, "get");

      // load article from html string
      const $ = cheerio.load(htmlStr);
      const articleDOMs = $(".article-item .article-info");
      let newContents: Omit<IContent, "id">[] = [];
      articleDOMs.each((i, el) => {
        const link = $(el).find("h3 a").attr("href") as string;
        const unixTime = $(el)
          .find(".article-meta time")
          .attr("data-timestamp") as string;
        const formattedTime = dayjs(Number(unixTime) * 1000).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        if (
          Number(unixTime) >= latestContentTime &&
          link !== latestContentUrl
        ) {
          newContents.unshift({
            title: $(el).find("h3 a").text(),
            summary: $(el).find(".article-summary").text(),
            link,
            websiteId: id,
            createdAt: formattedTime,
            updatedAt: formattedTime,
          });
        }
      });

      await sequelize.models.content.bulkCreate(newContents);
    }
  }

  // query condition
  let queryLimit = typeof limit === "string" ? Number(limit) : 10;
  if (queryLimit > 10 || queryLimit <= 0) queryLimit = 10;
  let startTimeValue = typeof startTime === "string" ? Number(startTime) : 0;
  const queryStartTime = dayjs(
    dayjs(startTimeValue).isValid() ? startTimeValue : 0
  ).format("YYYY-MM-DD HH:mm:ss");

  const res = (await sequelize.models.content.findAll({
    where: {
      websiteId: id,
      updatedAt: {
        [Op.gt]: queryStartTime,
      },
    },
    order: [["updatedAt", "DESC"]],
    limit: queryLimit,
  })) as unknown as IContent[];

  return res;
}
