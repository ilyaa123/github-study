<template>
	<el-container class="container">
		<el-main>
			<div class="wrapper">
				<slot />
			</div>
		</el-main>
	</el-container>
</template>
<style lang="css" scoped>
.container {
	min-height: 100dvh;
}
.wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
