<script setup lang="ts">
import type { RepoFile, RepoFiles } from '~/types/repositories/files';

interface Props {
	files: RepoFiles;
	isLoading: boolean;
}

interface Emits {
	(event: 'click-row', value: RepoFile): void;
	(event: 'back-folder'): void;
}

defineProps<Props>();

const emits = defineEmits<Emits>();

const handleOnClickRow = (row: RepoFile) => {
	if (row.name === '...') {
		emits('back-folder');
	} else {
		emits('click-row', row);
	}
};
</script>
<template>
	<el-table
		v-loading="isLoading"
		:data="files"
		lazy
		:row-style="{ cursor: 'pointer' }"
		@row-click="(row: RepoFile) => handleOnClickRow(row)"
	>
		<el-table-column width="80" prop="type">
			<template #default="scope">
				<el-icon size="24" color="var(--el-color-primary)">
					<Icon
						:name="
							scope.row.type === 'blob'
								? 'material-symbols:folder-outline-rounded'
								: 'ic:baseline-folder'
						"
					/>
				</el-icon>
			</template>
		</el-table-column>
		<el-table-column prop="name">
			<template #default="scope">
				<el-text size="large">{{ scope.row.name }}</el-text>
			</template>
		</el-table-column>
		<template #empty> <slot name="empty" /> </template>
	</el-table>
</template>
