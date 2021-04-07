<!--
 * @Author: Sunly
 * @Date: 2021-04-08 15:13:25
 * @LastEditTime: 2021-04-08 15:25:12
 * @LastEditors: Sunly
 * @Description: 
 * @FilePath: \i-mo-yu\src\App.vue
-->
<template>
	<div id="nav">
		<router-link to="/">Home</router-link> |
		<router-link to="/about">About</router-link>
	</div>
	<el-button>This is a button</el-button>
	<router-view />
</template>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
