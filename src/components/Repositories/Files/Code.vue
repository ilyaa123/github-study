<script setup lang="ts">
import repositoriesQuery from '~/graphql/repositories/file.gql';

interface Props {
	fileName: string[];
	owner: string;
	repoName: string;
	refName: string;
}

const props = defineProps<Props>();

const { data, pending } = useAsyncQuery<{
	repository: {
		object: {
			text: string;
		};
	};
}>(repositoriesQuery, {
	owner: props.owner,
	name: props.repoName,
	expression: `${props.refName}:${props.fileName.join('/')}`
});

const text = computed(() => data.value?.repository?.object?.text || '');
</script>
<template>
	<div v-loading="pending" class="text-start pa-4" style="line-height: 190%">
		<ClientOnly>
			<highlightjs autodetect :code="text" />
		</ClientOnly>
	</div>
</template>
