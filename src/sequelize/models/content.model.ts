/*
 * @Description: 网站文章模型
 * @Author: Sunly
 * @Date: 2021-10-21 20:43:28
 */
import { DataTypes } from "sequelize";
import type { Sequelize } from "sequelize";

export const defineContentModels = (sequelize: Sequelize) => {
  sequelize.define("content", {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    summary: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    link: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};
