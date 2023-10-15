<script setup lang="ts">
const filter = reactive({
	type: 'PRIVATE',
	sort: 'CREATED_AT'
});

const handleOnUpdate = (
	key: keyof typeof filter,
	value: (typeof filter)[keyof typeof filter]
) => {
	filter[key] = value;
};
</script>
<template>
	<div>
		<el-row class="mb-2">
			<el-col :span="11"> </el-col>
			<el-col :span="6" class="mr-1">
				<RepositoriesFilterTypeSelect
					:type="filter.type"
					@change="handleOnUpdate"
				/>
			</el-col>
			<el-col :span="6">
				<RepositoriesFilterSortSelect
					:sort="filter.sort"
					@change="handleOnUpdate"
				/>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<slot />
			</el-col>
		</el-row>
	</div>
</template>
