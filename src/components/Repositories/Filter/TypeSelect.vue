<script setup lang="ts">
interface Props {
	type: string;
}

interface Emits {
	(event: 'change', key: 'type', value: string): void;
}

defineProps<Props>();

const emits = defineEmits<Emits>();
</script>
<template>
	<el-select
		:model-value="type"
		size="large"
		placeholder="Type"
		style="width: 100%"
		@change="(e) => emits('change', 'type', e)"
	>
		<el-option label="Public" value="PUBLIC" />
		<el-option label="Private" value="PRIVATE" />
	</el-select>
</template>
