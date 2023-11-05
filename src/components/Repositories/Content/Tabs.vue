<script setup lang="ts">
type TabValues = 'code' | 'issues' | 'pull';

interface Tab {
	label: string;
	icon: string;
	value: TabValues;
}

const tabs: Tab[] = [
	{
		label: 'Code',
		icon: 'ph:code-bold',
		value: 'code'
	},
	{
		label: 'Issues',
		icon: 'ri:question-line',
		value: 'issues'
	},
	{
		label: 'Pull requests',
		icon: 'icon-park-solid:pull-requests',
		value: 'pull'
	}
];

interface Props {
	value: TabValues;
}

defineProps<Props>();
</script>
<template>
	<el-tabs :model-value="value">
		<el-tab-pane v-for="tab in tabs" :key="tab.value" :name="tab.value">
			<template #label>
				<span class="custom-tabs-label">
					<el-icon size="20" color="var(--el-color-primary)">
						<Icon :name="tab.icon"
					/></el-icon>
					<span class="ml-2">
						<el-text class="mx-1" size="large">{{
							tab.label
						}}</el-text>
					</span>
				</span>
			</template>
		</el-tab-pane>
	</el-tabs>
</template>
<style scoped>
.custom-tabs-label .el-icon {
	vertical-align: middle;
}
.custom-tabs-label span {
	vertical-align: middle;
}
</style>
