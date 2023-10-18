<script setup lang="ts">
import type { RepositoryOrderField } from '~/types/repositories/filter';

interface Props {
	sort: RepositoryOrderField;
}

interface Emits {
	(event: 'change', key: 'sort', value: RepositoryOrderField): void;
}

defineProps<Props>();

const emits = defineEmits<Emits>();
</script>
<template>
	<el-select
		:model-value="sort"
		size="large"
		placeholder="Soted by"
		@change="(e) => emits('change', 'sort', e)"
	>
		<el-option label="Created" value="CREATED_AT" />
		<el-option label="Updated" value="UPDATED_AT" />
		<el-option label="Pushed" value="PUSHED_AT" />
		<el-option label="Name" value="NAME" />
		<el-option label="Stars" value="STARGAZERS" />
	</el-select>
</template>
