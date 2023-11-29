<script setup lang="ts">
interface Props {
	total: number;
}

defineProps<Props>();

const currentPage = computed({
	get: () => 4,
	set: () => {}
});
</script>
<template>
	<el-pagination
		v-model:current-page="currentPage"
		:page-size="1"
		small
		background
		layout="prev, pager, next"
		:total="total"
		class="mt-4"
	/>
</template>
