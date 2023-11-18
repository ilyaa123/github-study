<script setup lang="ts">
import repositoriesQuery from '~/graphql/repositories/files.gql';
import { RepoFiles } from '~/types/repositories/files';
import { Ref } from '~/types/repositories/refs';

const route = useRoute();
const router = useRouter();
const { user } = useUser();
const name = route.params.name as string;
const owner = route.params.owner as string;

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
	expression: 'HEAD:'
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

const isStarChecked = computed(
	() =>
		!!data?.value?.repository?.stargazers?.nodes?.find(
			(item) => item.login === user.value?.login
		)
);
</script>
<template>
	<RepositoriesContentLayout>
		<template #header>
			<GlobalPageHeader
				:title="owner + ' / ' + name"
				:is-back="true"
				@back="router.push('/')"
			>
				<template #action>
					<RepositoriesContentHeaderActions
						:is-star-checked="isStarChecked"
					/>
				</template>
			</GlobalPageHeader>
		</template>
		<!-- <template #sub-header>
			<RepositoriesContentTabs value="code" />
		</template> -->
		<template #default>
			<RepositoriesContentFileActions
				v-if="pending || !!files.length"
				:active-ref="defaultBranchName"
				:refs="refs"
				style="max-width: 220px"
				@change-ref="
					(e) =>
						router.push(`/repository/${owner}/${name}/three/${e}`)
				"
			/>
			<RepositoriesContentFileThreeTable
				v-if="pending || !!files.length"
				:files="sortFiles([...files])"
				:is-loading="pending"
				@click-row="
					(file) =>
						router.push(
							`/repository/${owner}/${name}/three/${defaultBranchName}/${file.name}`
						)
				"
			/>
			<RepositoriesContentFileThreeTableBlank
				v-if="!files.length && !pending"
				:owner="owner"
				:name="name"
			/>
		</template>
	</RepositoriesContentLayout>
</template>
