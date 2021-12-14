/*
 * @Description: 获取少数派文章
 * @Author: Sunly
 * @Date: 2021-10-21 00:26:26
 */
import { sequelize } from "../../sequelize";
import { Op } from "sequelize";
import { axios } from "../httpRequest/axios";
import { websitesConfig } from "../../config/websites.config";
import dayjs from "../../utils/localTime";
import type { IContent } from "../../types/models.data";
import type { ISspaiRes } from "../../types/httpRes.data";

let timeLimit = 0;

const sspai = websitesConfig.find((website) => website.name === "少数派")!;
const { id, url } = sspai;

export async function getSspaiData(
  startTime?: string,
  limit?: string
): Promise<IContent[]> {
  if (url) {
    let data: ISspaiRes[] = [];

    // time limit
    if (dayjs().valueOf() - timeLimit > 10 * 60 * 1000) {
      // get new content from web
      data = (await axios<{ data: ISspaiRes[] }>(url, "get")).data;
      data.sort((a, b) => b.modify_time - a.modify_time);
    }

    // get content from database
    const contents = (await sequelize.models.content.findOne({
      where: {
        websiteId: id,
      },
      order: [["updatedAt", "DESC"]],
    })) as unknown as IContent;
    let latestContentId = -1;
    let latestContentTime = 0;
    if (contents) {
      latestContentId = Number(contents.link.split("/").slice(-1)[0]);
      latestContentTime = dayjs(contents.createdAt).unix();
    }

    // filter new content
    const newContents: Omit<IContent, "id">[] = [];
    if (data.length) {
      for (const item of data) {
        if (
          item.modify_time < latestContentTime ||
          item.id === latestContentId
        ) {
          break;
        }
        newContents.push({
          title: item.title,
          link: `https://sspai.com/post/${item.id}`,
          summary: item.summary,
          websiteId: id,
          createdAt: dayjs(item.created_time * 1000).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          updatedAt: dayjs(item.modify_time * 1000).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
        });
      }

      // add data to database
      if (newContents.length) {
        await sequelize.models.content.bulkCreate(newContents.reverse());
      }
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
