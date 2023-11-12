<template>
	<el-row>
		<el-col :span="24">
			<slot name="header" />
		</el-col>
		<el-col :span="6">
			<slot name="aside" />
		</el-col>
		<el-col :span="18">
			<slot name="default" />
		</el-col>
	</el-row>
</template>
