/*
 * @Author: Sunly
 * @Date: 2021-05-26 17:47:46
 * @LastEditTime: 2021-05-26 18:09:29
 * @LastEditors: Sunly
 * @Description: request装饰器
 * @FilePath: \server\src\decorators\request.ts
 */
import { LoginController } from "../controllers";

export enum Methods {
	get = "get",
	post = "post"
}

function createRequest(type: string) {
	return function controller(path: string) {
		return function (target: LoginController, key: string): void {
			Reflect.defineMetadata("path", path, target, key);
			Reflect.defineMetadata("method", type, target, key);
		};
	};
}

export const get = createRequest(Methods.get);
export const post = createRequest(Methods.post);
