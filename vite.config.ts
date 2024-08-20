import { ConfigEnv, defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import { createVitePlugins } from "./build/plugins";
import { preloadElementPlus } from "./build/preload";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
	const root = process.cwd();
	const env = loadEnv(mode, root);
	console.log(env);

	return {
		// base: '/NorthAdmin/',
		base: env.VITE_ENV === "development" ? "/" : "/north-admin/",
		resolve: {
			alias: {
				"~": resolve(__dirname, "src"),
			},
		},
		plugins: createVitePlugins(env),
		server: {
			host: "0.0.0.0",
			port: 6684,
			open: true,
		},
		// esbuild: {
		// 	pure: ['console.log', 'debugger'],
		// },
		optimizeDeps: {
			include: [
				"vue",
				"vue-router",
				"pinia",
				"axios",
				"element-plus",
				"element-plus/es",
				"dayjs",
				...preloadElementPlus(),
			],
		},
		build: {
			outDir: "dist",
			assetsDir: "assets",
			minify: "esbuild",
			// 设置为terser 使用，去除console和debugger
			// terserOptions: {
			// 	compress: {
			// 		drop_console: true,
			// 		drop_debugger: true
			// 	}
			// },
			sourcemap: false,
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (id.includes("node_modules")) {
							return id
								.toString()
								.split("node_modules/")[1]
								.split("/")[0]
								.toString();
						}
					},
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
				},
			},
		},
	};
});
