<script setup lang="ts">
interface Emits {
	(event: 'changeFilter', filter: { type: string; sort: string }): void;
}

const emits = defineEmits<Emits>();

interface Props {
	filter: {
		type: string;
		sort: string;
	};
}

const props = defineProps<Props>();

const handleOnUpdate = (
	key: keyof typeof props.filter,
	value: (typeof props.filter)[keyof typeof props.filter]
) => {
	const updatedFilter = props.filter;
	updatedFilter[key] = value;
	emits('changeFilter', updatedFilter);
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
