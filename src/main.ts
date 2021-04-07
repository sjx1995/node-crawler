/*
 * @Author: Sunly
 * @Date: 2021-04-08 15:13:25
 * @LastEditTime: 2021-04-08 15:34:16
 * @LastEditors: Sunly
 * @Description:
 * @FilePath: \i-mo-yu\src\main.ts
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ElButton, ElMessage } from "element-plus";
import "element-plus/packages/theme-chalk/src/index.scss";

createApp(App).use(store).use(router).component(ElButton.name, ElButton).use(ElMessage).mount("#app");
