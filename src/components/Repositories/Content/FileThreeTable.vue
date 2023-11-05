<script setup lang="ts">
import { RepoFiles } from '~/types/repositories/files';

interface Props {
	files: RepoFiles;
}

defineProps<Props>();
</script>
<template>
	<el-table :data="files">
		<el-table-column label="Type" prop="type" />
		<el-table-column label="Name" prop="name" />
	</el-table>
</template>
