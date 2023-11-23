<script setup lang="ts">
import repositoriesQuery from '~/graphql/repositories/files.gql';
import { RepoFile, RepoFiles } from '~/types/repositories/files';
import { Ref } from '~/types/repositories/refs';

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
	const firstFile: RepoFile = {
		name: '...',
		mode: 0,
		type: 'tree',
		language: {
			name: null
		}
	};

	return data.value?.repository?.object?.entries
		? [firstFile, ...data.value?.repository?.object?.entries]
		: [];
});

const refs = computed(() => data?.value?.repository?.refs?.nodes || []);
</script>
<template>
	<RepositoriesFilesLayout>
		<template #header>
			<GlobalPageHeader
				:title="owner + ' / ' + name"
				:is-back="true"
				@back="router.push(`/repository/${owner}/${name}/`)"
			/>
		</template>
		<template #aside>
			<RepositoriesFilesAside>
				<template #header>
					<RepositoriesElementsRefSelect
						:active-ref="ref"
						:refs="refs"
						style="width: 100%; max-width: none"
						@change-ref="
							(e) =>
								router.push(
									`/repository/${owner}/${name}/three/${e}/${file.join(
										'/'
									)}`
								)
						"
					/>
				</template>
				<RepositoriesFilesThree
					:owner="owner"
					:name="name"
					:ref-name="ref"
					:file-names="file"
				/>
			</RepositoriesFilesAside>
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
			@back-folder="
				router.push(
					`/repository/${owner}/${name}/three/${ref}/${file
						.slice(0, -1)
						.join('/')}`
				)
			"
		>
			<template v-if="files.length === 0 && !pending" #empty>
				<RepositoriesFilesCode
					:file-name="file"
					:owner="owner"
					:repo-name="name"
					:ref-name="ref"
				/>
			</template>
		</RepositoriesContentFileThreeTable>
	</RepositoriesFilesLayout>
</template>
