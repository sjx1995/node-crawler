/*
 * @Author: Sunly
 * @Date: 2021-05-26 17:47:08
 * @LastEditTime: 2021-05-26 18:10:35
 * @LastEditors: Sunly
 * @Description: controller装饰器
 * @FilePath: \server\src\decorators\controller.ts
 */
import router from "../router";
import { Methods } from "./request";

export function controller(root?: string): Function {
	return function (target: new (...args: any[]) => {}): void {
		console.log("target", target.prototype);
		for (let key in target.prototype) {
			console.log("key", key);
			const path = Reflect.getMetadata("path", target.prototype, key);
			const fullPath = !root || root === "/" ? path : `${root}${path}`;
			const handler = target.prototype[key];
			const method: Methods = Reflect.getMetadata("method", target.prototype, key);
			router[method](fullPath, handler);
		}
		console.log(router);
	};
}
