<template>
	<el-container class="main my-2 ma-auto">
		<el-container>
			<el-header><LayoutDefaultAppBar /></el-header>
			<el-main><slot /></el-main>
		</el-container>
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
