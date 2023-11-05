<script setup lang="ts">
import { RepoFiles } from '~/types/repositories/files';

interface Props {
	files: RepoFiles;
}

defineProps<Props>();
</script>
<template>
	<el-table :data="files">
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
	</el-table>
</template>
