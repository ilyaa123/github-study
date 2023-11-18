<script setup lang="ts">
import { RepoFileTree } from '~/types/repositories/files';

interface Props {
	item: RepoFileTree;
}

defineProps<Props>();
</script>
<template>
	<RepositoriesFilesThreeItemSinge
		v-if="item.type === 'blob'"
		:name="item.name"
		:path="item.path"
	/>
	<RepositoriesFilesThreeItemMulti
		v-else
		:name="item.name"
		:path="item.path"
	/>
</template>
