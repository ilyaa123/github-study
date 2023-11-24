<script setup lang="ts">
import { EpPropMergeType } from 'element-plus/es/utils';
import { Commit, StatusState } from '~/types/commit';

interface Props {
	commit: Commit;
}

defineProps<Props>();

const statusStateColors: Record<
	StatusState,
	EpPropMergeType<
		StringConstructor,
		'' | 'success' | 'warning' | 'info' | 'danger',
		unknown
	>
> = {
	EXPECTED: 'info',
	ERROR: 'danger',
	FAILURE: 'warning',
	PENDING: '',
	SUCCESS: 'success'
};
</script>
<template>
	<el-row v-if="!!commit" class="gap-2">
		<el-text
			>Updated on
			{{ formatDate(commit.committedDate, 'DD.MM.YYYY') }}</el-text
		>
		<el-tag
			:type="
				!!commit?.status?.state
					? statusStateColors[commit.status.state]
					: 'success'
			"
			>{{ commit.oid.slice(0, 7) }}</el-tag
		>
		<el-text class="flex items-center">
			<el-icon class="mr-1" size="24" color="var(--el-color-primary)">
				<Icon name="ph:clock-counter-clockwise-fill" />
			</el-icon>
			{{ commit.history.totalCount }}
			commits
		</el-text>
	</el-row>
</template>
