/**
 * @author North
 * @description vite插件配置
 * @Date 2024年8月6日
 */
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createHtmlPlugin } from 'vite-plugin-html'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export const createVitePlugins = (env: Record<string, string>) => {
	return [
		vue(),
		vueJsx(),
		UnoCSS(),
		createHtmlPlugin({
			minify: true,
			inject: {
				data: {
					title: env.VITE_APP_TITLE,
				},
			},
		}),
		Components({
			/* options */
			dts: 'src/typings/components.d.ts',
			extensions: ['vue'], // extensions: ['vue']
			deep: true,
			include: [/\.vue$/, /\.vue\?vue/],
			exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
			resolvers: [ElementPlusResolver()],
		}),
		AutoImport({
			imports: [
				'vue',
				'vue-router',
				'pinia',
				{
					// add any other imports you were relying on
				},
			],
			dts: 'src/typings/auto-imports.d.ts',
			dirs: ['src/stores'],
			vueTemplate: true,
			eslintrc: {
				enabled: true, // Default `false`
				filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
				globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
			},
			resolvers: [ElementPlusResolver()],
		}),
		Icons({
			compiler: 'vue3',
			defaultClass: 'inline',
			defaultStyle: 'vertical-align: sub;',
		}),
	]
}
