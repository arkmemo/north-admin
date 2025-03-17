import globals from 'globals'
import pluginJs from '@eslint/js'
import tsEslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { readFile } from 'node:fs/promises'

const autoImportFile = new URL('.eslintrc-auto-import.json', import.meta.url)
const autoImportGlobals = JSON.parse(await readFile(autoImportFile, 'utf8'))

export default [
	{ files: ['**/*.{js,mjs,cjs,ts,vue}'] },
	{ languageOptions: { globals: { ...globals.browser, ...globals.node, ...autoImportGlobals.globals } } },
	pluginJs.configs.recommended,
	...tsEslint.configs.recommended,
	...pluginVue.configs['flat/essential'],
	{ files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tsEslint.parser } } },
	{
		rules: {
			eqeqeq: 'error', // 要求使用 === 和 !==
			'no-var': 'error', // 要求使用 let 或 const 而不是 var
			'no-undef': 'off', // 禁止 no-undef 报错
			'vue/multi-word-component-names': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
		},
	},
]
