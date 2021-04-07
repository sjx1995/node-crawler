/*
 * @Author: Sunly
 * @Date: 2021-04-08 15:13:25
 * @LastEditTime: 2021-04-08 15:23:20
 * @LastEditors: Sunly
 * @Description:
 * @FilePath: \i-mo-yu\babel.config.js
 */
module.exports = {
	presets: ["@vue/cli-plugin-babel/preset"],
	plugins: [
		[
			"import",
			{
				libraryName: "element-plus",
				customStyleName: name => {
					name = name.slice(3);
					return `element-plus/packages/theme-chalk/src/${name}.scss`;
				}
			}
		]
	]
};
