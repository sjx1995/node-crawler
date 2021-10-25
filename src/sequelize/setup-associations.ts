/*
 * @Description: 建立模型关系
 * @Author: Sunly
 * @Date: 2021-10-21 21:19:49
 */
import {} from "sequelize";
import type { Sequelize } from "sequelize";

export const defineAssociations = (sequelize: Sequelize) => {
  const { website, content } = sequelize.models;
  website.hasMany(content);
  content.belongsTo(website);
};
