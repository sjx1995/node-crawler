/*
 * @Author: Sunly
 * @Date: 2021-05-13 18:47:54
 * @LastEditTime: 2021-05-26 14:10:03
 * @LastEditors: Sunly
 * @Description: 路由
 * @FilePath: \server\src\router.ts
 */
import path from "path";
import fs from "fs";
import "reflect-metadata";
import router, { Request, Response, NextFunction } from "express";
import { getData } from "./getData";
import { getResponse } from "./utils/util";

interface passwordWithBody extends Request {
	body: {
		password: string | undefined;
	};
}

function controller() {
	return function (target: any, key: string) {
		console.log(target, key);
	};
}

function get(path: string) {
	return function (target: any): void {
		Reflect.defineMetadata("path", path, target);
	};
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
	const isLogin = req.session ? req.session.isLogin : false;
	if (isLogin) {
		next();
	} else {
		res.send(getResponse(null, "用户未登录")).end();
	}
};

const routes = router();

// routes.get("/", (req, res) => {});

routes.post("/login", (req: passwordWithBody, res) => {
	const password = req.body.password;
	if (req.session?.isLogin) {
		res.send(getResponse("已经登陆")).end();
	} else {
		if (password === "111111" && req.session) {
			req.session.isLogin = true;
			res.send(getResponse("登陆成功")).end();
		} else {
			res.send(getResponse(null, "登陆失败，密码错误")).end();
		}
	}
});

routes.get("/logout", (req, res) => {
	if (req.session) {
		req.session.isLogin = false;
	}
	res.send(getResponse("用户登出"));
});

routes.get("/getData", checkLogin, (req, res) => {
	getData();
	res.send(getResponse("数据爬取成功")).end();
});

routes.get("/showData", checkLogin, (req, res) => {
	try {
		const dirName = path.resolve(__dirname, "../data");
		const files = fs.readdirSync(dirName);
		const data: { [key: string]: JSON } = {};
		files.forEach(file => {
			const fileName = file.split(".")[0];
			const fileDir = path.resolve(dirName, file);
			const fileContent = fs.readFileSync(fileDir, "utf-8");
			data[fileName] = JSON.parse(fileContent);
		});
		res.send(getResponse(data)).end();
	} catch {
		res.send(getResponse(null, "数据不存在")).end();
	}
});

export default routes;
