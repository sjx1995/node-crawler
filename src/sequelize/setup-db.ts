/*
 * @Description: 建立数据库
 * @Author: Sunly
 * @Date: 2021-10-21 20:42:34
 */
import { sequelize } from "./index";
import { websitesConfig } from "../config/websites.config";

const websitesInfo = websitesConfig.map((website) => ({
  id: website.id,
  name: website.name,
}));

async function setupDB() {
  await sequelize.sync({ force: true });

  await sequelize.models.website.bulkCreate(websitesInfo);

  const websites: any[] = await sequelize.models.website.findAll();

  const myLink = websites.find((website) => website.name === "myLinks");
  const contents = [];
  contents.push({
    title: "博客",
    link: "https://sunly.in",
    websiteId: myLink.id,
    createdAt: "1970-01-01 08:00:00",
  });
  contents.push({
    title: "github",
    link: "https://github.com/sjx1995",
    websiteId: myLink.id,
    createdAt: "1980-11-01 08:00:00",
  });
  await sequelize.models.content.bulkCreate(contents);

  console.log("数据库初始化完成！");
}

setupDB();
