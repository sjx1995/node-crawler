/*
 * @Author: Sunly
 * @Date: 2021-05-21 21:17:20
 * @LastEditTime: 2021-05-21 21:21:40
 * @LastEditors: Sunly
 * @Description: 工具类
 * @FilePath: \mo-yoo\server\src\utils\util.ts
 */
interface Res {
	success: Boolean;
	data: any;
	errMessage?: string;
}

export const getResponse: (data: any, errMessage?: string) => Res = (data, errMessage) => {
	if (errMessage) {
		return {
			success: false,
			data,
			errMessage
		};
	}
	return {
		success: true,
		data
	};
};
