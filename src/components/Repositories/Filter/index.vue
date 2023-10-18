<script setup lang="ts">
import type { Filter } from '~/types/repositories/filter';

interface Emits {
	(event: 'changeFilter', filter: Filter): void;
}

const emits = defineEmits<Emits>();

interface Props {
	filter: Filter;
}

const props = defineProps<Props>();

const handleOnUpdate = (key: keyof Filter, value: Filter[keyof Filter]) => {
	const updatedFilter = props.filter;
	updatedFilter[key] = value as never;
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
