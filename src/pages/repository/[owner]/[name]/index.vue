<script setup lang="ts">
import repositoriesQuery from '~/graphql/repositories/files.gql';
import { RepoFiles } from '~/types/repositories/files';

const route = useRoute();

const name = route.params.name;
const owner = route.params.owner;

const { data } = useAsyncQuery<{
	repository: { object: { entries: RepoFiles } };
}>(repositoriesQuery, {
	owner,
	name
});

const files = computed(() => {
	return data.value?.repository?.object?.entries || [];
});
</script>
<template>
	<div>
		<RepositoriesContentFileThreeTable :files="files" />
	</div>
</template>
