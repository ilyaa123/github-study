<template>
	<el-container class="main my-2 ma-auto">
		<el-aside class="mr-4"><LayoutDefaultAside /></el-aside>
		<el-container>
			<el-header style="text-align: right; font-size: 12px"
				><LayoutDefaultAppBar
			/></el-header>
			<el-main><slot /></el-main>
		</el-container>
	</el-container>
</template>
<style lang="scss" scoped>
.main {
	min-height: 100dvh;
	max-width: 1600px;
}

.el-header {
	position: relative;
	background-color: var(--el-color-primary-light-7);
	color: var(--el-text-color-primary);
}
</style>
