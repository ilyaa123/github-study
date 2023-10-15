<script setup lang="ts">
interface Props {
	sort: string;
}

interface Emits {
	(event: 'change', key: 'sort', value: string): void;
}

defineProps<Props>();

const emits = defineEmits<Emits>();
</script>
<template>
	<el-select
		:model-value="sort"
		size="large"
		placeholder="Soted by"
		style="width: 100%"
		@change="(e) => emits('change', 'sort', e)"
	>
		<el-option label="Created" value="CREATED_AT" />
		<el-option label="Updated" value="UPDATED_AT" />
		<el-option label="Pushed" value="PUSHED_AT" />
		<el-option label="Name" value="NAME" />
		<el-option label="Stars" value="STARGAZERS" />
	</el-select>
</template>
