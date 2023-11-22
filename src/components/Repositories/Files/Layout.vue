<template>
	<el-row>
		<el-col :span="24">
			<slot name="header" />
		</el-col>
		<el-col :span="24">
			<el-row :gutter="20">
				<el-col :md="6" :span="24">
					<slot name="aside" />
				</el-col>
				<el-col :md="18" :span="24">
					<slot name="default" />
				</el-col>
			</el-row>
		</el-col>
	</el-row>
</template>
