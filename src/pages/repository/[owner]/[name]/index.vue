<script setup lang="ts">
import repositoriesQuery from '~/graphql/repositories/files.gql';
import { RepoFiles } from '~/types/repositories/files';
import { Ref } from '~/types/repositories/refs';

const route = useRoute();
const router = useRouter();

const name = route.params.name as string;
const owner = route.params.owner as string;

const { data, pending } = useAsyncQuery<{
	repository: {
		object: { entries: RepoFiles };
		refs: { nodes: Ref[] };
		defaultBranchRef: { name: string };
	};
}>(repositoriesQuery, {
	owner,
	name
});

const files = computed(() => {
	return data.value?.repository?.object?.entries || [];
});

const refs = computed(() => {
	return data?.value?.repository?.refs?.nodes || [];
});

const defaultBranchName = computed(() => {
	return data?.value?.repository?.defaultBranchRef?.name || 'main';
});

// const markDown = computed(() => {
// 	const file = files.value.find((item) => item.language.name === 'Markdown');
// 	console.log('🚀 ~ file: index.vue:37 ~ markDown ~ file:', file);

// 	return file;
// });
</script>
<template>
	<RepositoriesContentLayout>
		<template #header>
			<GlobalPageHeader
				:title="owner + ' / ' + name"
				:is-back="true"
				@back="router.back()"
			>
				<template #action>
					<RepositoriesContentHeaderActions />
				</template>
			</GlobalPageHeader>
		</template>
		<template #sub-header>
			<RepositoriesContentTabs value="code" />
		</template>
		<template #default>
			<RepositoriesContentFileActions
				v-if="pending || !!files.length"
				:active-ref="defaultBranchName"
				:refs="refs"
			/>
			<RepositoriesContentFileThreeTable
				v-if="pending || !!files.length"
				:files="sortFiles([...files])"
				:is-loading="pending"
			/>
			<RepositoriesContentFileThreeTableBlank
				v-if="!files.length && !pending"
				:owner="owner"
				:name="name"
			/>
		</template>
	</RepositoriesContentLayout>
</template>
