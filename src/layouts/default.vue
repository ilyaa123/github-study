<script setup lang="ts">
const route = useRoute();

const isBackTop = computed(() =>
	typeof route.meta.backtop === 'boolean' ? route.meta.backtop : false
);
</script>
<template>
	<el-container class="main my-2 ma-auto">
		<el-container>
			<el-header><LayoutDefaultAppBar /></el-header>
			<el-main><slot /></el-main>
		</el-container>
		<LayoutDefaultDrawer />
		<el-backtop v-if="isBackTop" :right="100" :bottom="100" />
	</el-container>
</template>
<style lang="scss" scoped>
.main {
	min-height: 100dvh;
	max-width: 1400px;
}

.el-header {
	position: relative;
	background-color: var(--el-color-primary-light-3);
	color: var(--el-text-color-primary);
}
</style>
