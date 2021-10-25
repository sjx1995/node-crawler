/*
 * @Description: 网站名称模型
 * @Author: Sunly
 * @Date: 2021-10-21 20:42:56
 */
import { DataTypes } from "sequelize";
import type { Sequelize } from "sequelize";

export const defineWebsiteModels = (sequelize: Sequelize) => {
  sequelize.define("website", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};
