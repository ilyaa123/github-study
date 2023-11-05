<template>
	<el-row>
		<el-col :span="24">
			<slot name="header" />
		</el-col>
		<el-col :span="24">
			<slot name="sub-header" />
		</el-col>
		<el-col :span="24">
			<slot name="default" />
		</el-col>
	</el-row>
</template>
