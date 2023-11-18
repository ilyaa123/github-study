<script setup lang="ts">
import repositoriesQuery from '~/graphql/repositories/file-tree.gql';

import { RepoFileTree } from '~/types/repositories/files';

interface Props {
	owner: string;
	name: string;
	refName: string;
	fileNames: string[];
}

const props = defineProps<Props>();

const { data, pending } = useAsyncQuery<{
	repository: {
		object: { entries: RepoFileTree[] };
	};
}>(repositoriesQuery, {
	owner: props.owner,
	name: props.name,
	expression: `${props.refName}:`
});

const items = computed(() => data.value?.repository?.object?.entries || []);
</script>
<template>
	<el-menu
		v-loading="pending"
		:default-active="fileNames.join('/')"
		:default-openeds="fileNames"
	>
		<template v-for="(item, index) in sortFiles([...items])" :key="index">
			<RepositoriesFilesThreeItem :item="item" />
		</template>
	</el-menu>
</template>
