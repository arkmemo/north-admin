<script setup lang="ts">
import { useToggleTheme } from '~/hooks'

const { toggleTheme, isDark } = useToggleTheme()
</script>

<template>
	<div cursor="pointer" ml-10px @click="toggleTheme">
		<Icon icon="fluent:weather-moon-20-regular" v-if="!isDark" text-26px />
		<Icon icon="fluent:dark-theme-20-filled" v-else text-26px />
	</div>
</template>

<style lang="scss" scoped></style>
