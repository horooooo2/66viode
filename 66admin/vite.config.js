import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import path from 'path-browserify'
import path from "path";

import { viteMockServe } from "vite-plugin-mock";
import eslintPlugin from 'vite-plugin-eslint';

// svg-icon插件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
export default defineConfig(({ mode }) => {
	return {
	base: "./", // 打包路径s
	plugins: [
		vue(),
		createSvgIconsPlugin({
			// 指定要缓存的图标文件夹
			iconDirs: [path.resolve("./src/icons/svg")],
			// 执行icon name的格式
			symbolId: "icon-[name]"
		}),
		viteMockServe({
			ignore: /^_/, // 忽略以下划线`_`开头的文件
			mockPath: 'mock', // 指定mock目录中的文件全部是mock接口
			supportTs: false, // mockPath目录中的文件是否支持ts文件，现在我们不使用ts，所以设为false
			localEnabled: mode === 'mock', // 开发环境是否开启mock功能（可以在package.json的启动命令中指定mode为mock）
			prodEnabled: mode === 'mock', // 生产环境是否开启mock功能
			injectCode: `
			  import { setupProdMockServer } from '../mock/_createProductionServer';
			  setupProdMockServer();
			`,
		}),
		// viteMockServe({
		// 	enable: false,
		// 	logger: true,
		// 	mockPath: "./mock/",
		// 	supportTs: false
		// }),
		eslintPlugin({
			include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
			exclude: ['node_modules/**', 'dist/**'], // 排除不需要检查的文件和目录。
			fix: true,  // 在保存文件时自动修复 ESLint 问题。
			cache: false // 禁用 ESLint 缓存，以便每次都执行完整检查。
		}),
	],
	resolve: {
		alias: {
			// "@": path.resolve("./src")
			'@': path.resolve(__dirname, 'src'),
		},
		extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
	},
	server: {
		cors: true, // 允许跨域
		host: "0.0.0.0",
		open: true, // 服务启动时是否自动打开浏览器
		port: 9999, // 服务端口号
		proxy: {
			"/api": {
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
				target: "http://127.0.0.1:9999/",
				ws: false,
				// target: "http://localhost:8080/"

			}
		}

	}

}});