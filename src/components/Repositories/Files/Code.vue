<script setup lang="ts">
import repositoriesQuery from '~/graphql/repositories/file.gql';

interface Props {
	fileName: string;
	owner: string;
	repoName: string;
	refName: string;
}

const props = defineProps<Props>();

const { data } = useAsyncQuery<{
	repository: {
		object: {
			text: string;
		};
	};
}>(repositoriesQuery, {
	owner: props.owner,
	name: props.repoName,
	expression: `${props.refName}:${props.fileName}`
});

const text = computed(() => data.value?.repository?.object?.text || '');
</script>
<template>
	<v-card>test</v-card>
</template>
