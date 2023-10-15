<script setup lang="ts">
interface Props {
	updatedAt: string;
	primaryLanguage: {
		color: string;
		name: string;
	} | null;
}
const props = defineProps<Props>();

const computedUpdatedAt = computed(() => {
	return new Date(props.updatedAt).toLocaleDateString().split('.').join('/');
});
</script>
<template>
	<el-row>
		<el-col :span="12">
			<el-text v-if="!!primaryLanguage" size="small">
				<el-row class="items-center">
					<div
						class="w-5 h-5 mr-1"
						:style="{
							backgroundColor: primaryLanguage?.color,
							borderRadius: '50%'
						}"
					></div>
					{{ props.primaryLanguage?.name }}
				</el-row>
			</el-text>
		</el-col>
		<el-col :span="12" class="text-end">
			<el-text>Updated on: {{ computedUpdatedAt }}</el-text>
		</el-col>
	</el-row>
</template>
