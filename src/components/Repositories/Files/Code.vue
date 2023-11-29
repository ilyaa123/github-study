<script setup lang="ts">
import hljs from 'highlight.js/lib/core';

import getFileQuery from '~/graphql/repositories/file.gql';

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
}>(getFileQuery, {
	owner: props.owner,
	name: props.repoName,
	expression: `${props.refName}:${props.fileName.join('/')}`
});

const text = computed(() => {
	return hljs.highlightAuto(data.value?.repository?.object?.text || '').value;
});
</script>
<template>
	<div v-loading="pending" class="text-start pa-4" style="line-height: 190%">
		<pre v-html="text"></pre>
	</div>
</template>
