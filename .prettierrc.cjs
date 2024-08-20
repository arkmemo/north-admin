/** @type {import("prettier").Config} */
module.exports = {
	printWidth: 120, // 单行长度
	tabWidth: 4, // 缩进长度
	useTabs: true, // 使用tab
	semi: false, // 句末使用分号
	singleQuote: true, // 使用单引号
	jsxSingleQuote: true, // jsx中使用单引号
	trailingComma: 'all', //多行时尽可能打印尾随逗号
	jsxBracketSameLine: true, //多属性html标签的‘>’折行放置
	endOfLine: 'lf', //结束行形式
}
