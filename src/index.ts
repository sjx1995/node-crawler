/*
 * @Author: Sunly
 * @Date: 2021-05-13 18:44:44
 * @LastEditTime: 2021-05-26 19:03:54
 * @LastEditors: Sunly
 * @Description: express入口
 * @FilePath: \server\src\index.ts
 */
import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import "./controllers/login";
import router from "./router";

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
// app.use(bodyParser.json());

app.use(
	cookieSession({
		name: "session",
		keys: [`cookie_${new Date()}`],
		// Cookie Options
		maxAge: 24 * 60 * 60 * 1000 // 24 hours
	})
);

app.use(router);

app.listen(3000, () => {
	console.log("server is running on http://localhost:3000");
});
