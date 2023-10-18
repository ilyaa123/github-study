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
			<RepositoriesFilterTypeSelect
				:type="filter.type"
				@change="handleOnUpdate"
			/>
			<RepositoriesFilterSortSelect
				:sort="filter.sort"
				class="ml-1"
				@change="handleOnUpdate"
			/>
			<slot />
		</el-row>
	</div>
</template>
