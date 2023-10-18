<script setup lang="ts">
import type { RepositoryPrivacy } from '~/types/repositories/filter';

interface Props {
	type: RepositoryPrivacy;
}

interface Emits {
	(event: 'change', key: 'type', value: RepositoryPrivacy): void;
}

defineProps<Props>();

const emits = defineEmits<Emits>();
</script>
<template>
	<el-select
		:model-value="type"
		size="large"
		placeholder="Type"
		@change="(e) => emits('change', 'type', e)"
	>
		<el-option label="Public" value="PUBLIC" />
		<el-option label="Private" value="PRIVATE" />
	</el-select>
</template>
