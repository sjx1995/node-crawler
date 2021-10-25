/*
 * @Description:
 * @Author: Sunly
 * @Date: 2021-10-21 20:42:01
 */
import { Sequelize } from "sequelize";
import { defineWebsiteModels, defineContentModels } from "./models";
import { defineAssociations } from "./setup-associations";
import { databaseConfig } from "../config/database.config";

const { databaseName, username, password, host, port } = databaseConfig;

const sequelize = new Sequelize(databaseName, username, password, {
  host,
  port,
  dialect: "mysql",
  timezone: "+08:00",
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  },
});

// define models
defineWebsiteModels(sequelize);
defineContentModels(sequelize);

// define associations
defineAssociations(sequelize);

export { sequelize };
