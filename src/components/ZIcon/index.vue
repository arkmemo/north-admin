<template>
	<div :style="`--svg-icon-url: url(${icon});width:${width};height:${height}`" class="svg-icon svg-icon-online" :class="className"></div>
</template>

<script setup lang="ts">
defineProps({
	// SVG 图标名称或在线URL
	icon: {
		type: String,
		required: true
	},
	width: {
		type: String,
		default: '18px'
	},
	height: {
		type: String,
		default: '18px'
	},
	// 图标类名
	className: {
		type: String,
		default: ''
	}
})
</script>

<style lang="scss" scoped>
.svg-icon {
	width: 18px;
	height: 18px;
	fill: currentColor;
}
.svg-icon-online {
	background-color: currentColor;
	mask-image: var(--svg-icon-url);
	-webkit-mask-image: var(--svg-icon-url);
	mask-size: cover;
	-webkit-mask-size: cover;
	display: inline-block;
}
</style>
