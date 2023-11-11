<script setup lang="ts">
import repositoriesQuery from '~/graphql/repositories/files.gql';
import { RepoFiles } from '~/types/repositories/files';

const route = useRoute();
const router = useRouter();

const owner = route.params.owner as string;
const name = route.params.name as string;
const ref = route.params.ref as string;
const file = route.params.files as string[];

const { data, pending } = useAsyncQuery<{
	repository: {
		object: { entries: RepoFiles };
		refs: { nodes: Ref[] };
		defaultBranchRef: { name: string };
		stargazers: {
			nodes: {
				login: string;
			}[];
		};
	};
}>(repositoriesQuery, {
	owner,
	name,
	expression: `${ref}:${file.join('/')}`
});

const files = computed(() => {
	return data.value?.repository?.object?.entries || [];
});
</script>
<template>
	<RepositoriesFilesLayout>
		<template #aside>
			<RepositoriesFilesAside />
		</template>
		<RepositoriesContentFileThreeTable
			:files="sortFiles([...files])"
			:is-loading="pending"
			@click-row="
				(row) =>
					router.push(
						`/repository/${owner}/${name}/three/${ref}/${file.join(
							'/'
						)}/${row.name}`
					)
			"
		>
			<template v-if="files.length === 0 && !pending" #empty>
				<RepositoriesFilesCode
					:file-name="file[file.length - 1]"
					:owner="owner"
					:repo-name="name"
					:ref-name="ref"
				/>
			</template>
		</RepositoriesContentFileThreeTable>
	</RepositoriesFilesLayout>
</template>
