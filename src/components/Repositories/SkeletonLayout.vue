<script setup lang="ts">
const props = defineProps({
	isLoading: {
		type: Boolean,
		default: true
	},
	count: {
		type: Number,
		required: true
	}
});
</script>
<template>
	<el-skeleton animated :loading="props.isLoading" :count="props.count">
		<template #template>
			<el-skeleton-item
				class="mb-2"
				variant="text"
				style="height: 100px"
			/>
		</template>
		<template #default>
			<slot />
		</template>
	</el-skeleton>
</template>
