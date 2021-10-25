/*
 * @Description: 获取少数派文章
 * @Author: Sunly
 * @Date: 2021-10-21 00:26:26
 */
import { sequelize } from "../../sequelize";
import { axios } from "../httpRequest/axios";
import { websitesConfig } from "../../config/websites.config";
import type { IContent } from "../../types/models.data";
import type { ISspaiRes } from "../../types/httpRes.data";
import dayjs from "../../utils/localTime";

let timeLimit = 0;

const sspai = websitesConfig.find((website) => website.name === "少数派")!;
const { id, url } = sspai;

export async function getData() {
  if (url) {
    let data: ISspaiRes[] = [];

    // time limit
    if (dayjs().valueOf() - timeLimit > 10 * 60 * 1000) {
      // get new content from web
      data = (await axios<{ data: ISspaiRes[] }>(url, "get")).data;
      data.sort((a, b) => b.modify_time - a.modify_time);
    }

    // get content from database
    const contents = (await sequelize.models.content.findAll({
      where: {
        websiteId: id,
      },
      order: [["updatedAt", "DESC"]],
      limit: 10,
    })) as unknown as IContent[];
    let latestContentId = -1;
    let latestContentTime = 0;
    if (contents.length) {
      latestContentId = Number(contents[0].link.split("/").slice(-1)[0]);
      latestContentTime = dayjs(contents[0].createdAt).unix();
    }

    // filter new content
    const newContents = [];
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

    return [...newContents, ...contents].splice(0, 10);
  }
  return [];
}
