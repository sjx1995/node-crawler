/*
 * @Description:
 * @Author: Sunly
 * @Date: 2021-10-21 20:15:52
 */
import { app } from "./server/routes";
import { sequelize } from "./sequelize/index";

async function init() {
  try {
    await sequelize.authenticate();
    console.log("数据库连接测试通过");
    app.listen(9000, () => {
      console.log(`server is running on http://localhost:${9000}`);
    });
  } catch (e) {
    console.log("数据库连接测试失败", e);
  }
}

init();
