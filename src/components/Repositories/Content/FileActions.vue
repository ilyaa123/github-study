<template>
	<el-row>
		<el-col :md="12" :span="24">
			<slot name="left" />
		</el-col>
		<el-col :md="12" :span="24">
			<slot name="right" />
		</el-col>
	</el-row>
</template>
