<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';

const props = defineProps({
	modelValue: {
		type: String,
		required: true
	},
	searchTypeValue: {
		type: String,
		required: true
	}
});

const emits = defineEmits(['update:modelValue', 'update:searchTypeValue']);

const inputValue = computed({
	get: () => props.modelValue,
	set: (value: string) => emits('update:modelValue', value)
});

const typeValue = computed({
	get: () => props.searchTypeValue,
	set: (value) => emits('update:searchTypeValue', value)
});
</script>
<template>
	<el-input v-model="inputValue" placeholder="Search...">
		<template #prepend>
			<el-select
				v-model="typeValue"
				placeholder="Select"
				style="max-width: 125px"
			>
				<el-option label="Repositories" value="REPOSITORY" />
				<el-option label="Users" value="USER" />
				<el-option label="Issues" value="ISSUE" />
			</el-select>
		</template>
		<template #append>
			<el-button :icon="Search" />
		</template>
	</el-input>
</template>
