<script setup lang="ts">
import { Ref } from '~/types/repositories/refs';

interface Props {
	refs: Ref[];
	activeRef: string;
}

defineProps<Props>();
</script>
<template>
	<el-row>
		<el-select :model-value="activeRef">
			<el-option
				v-for="(ref, index) in refs"
				:key="index"
				:label="ref.name"
				:value="ref.name"
			/>
		</el-select>
	</el-row>
</template>
