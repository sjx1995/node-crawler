/*
 * @Author: Sunly
 * @Date: 2021-05-26 11:40:28
 * @LastEditTime: 2021-05-26 17:50:28
 * @LastEditors: Sunly
 * @Description: 登录相关控制器
 * @FilePath: \server\src\controllers\login.ts
 */
import "reflect-metadata";
import { Request, Response } from "express";
import { controller, get } from "../decorators";

@controller()
export class LoginController {
	@get("/show")
	show(req: Request, res: Response) {
		res.send("it's res").end();
	}

	@get("/")
	home(req: Request, res: Response) {
		if (req.session?.isLogin) {
			res.send(
				`
          <a href="/getData">爬取数据</a>
          <a href="/showData">展示数据</a>
          <a href="/logout">登出</a>
        `
			);
		} else {
			res
				.send(
					`
            <html charset="utf-8">
              <body>
                <form method="post" action="/login">
                  <input type="password" name="password" value="" />
                  <input type="submit" value="登录" />
                </form>
              </body>
            </html>
          `
				)
				.end();
		}
	}
}
