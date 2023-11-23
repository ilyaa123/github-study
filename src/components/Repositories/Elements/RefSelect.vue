<script setup lang="ts">
import { Ref } from '~/types/repositories/refs';

interface Props {
	refs: Ref[];
	activeRef: string;
}

interface Emits {
	(event: 'changeRef', value: string): void;
}

defineProps<Props>();

const emits = defineEmits<Emits>();
</script>
<template>
	<el-select
		:model-value="activeRef"
		style="width: 100%; max-width: 220px"
		@change="(e) => emits('changeRef', e)"
	>
		<el-option
			v-for="(ref, index) in refs"
			:key="index"
			:label="ref.name"
			:value="ref.name"
		/>
	</el-select>
</template>
