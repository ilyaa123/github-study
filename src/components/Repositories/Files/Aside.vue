<template>
	<el-card>
		<template #header>
			<slot name="header" />
		</template>
		<slot name="default" />
	</el-card>
</template>
