<script setup lang="ts">
import { ElNotification } from 'element-plus';

import repositoriesQuery from '~/graphql/repositories/info.gql';
import addStarMutation from '~/graphql/repositories/stars/addStar.gql';
import removeStarMutation from '~/graphql/repositories/stars/removeStar.gql';

import { RepoFiles } from '~/types/repositories/files';
import { Ref } from '~/types/repositories/refs';
import { Commit } from '~/types/commit';

const route = useRoute();
const router = useRouter();
const { user } = useUser();
const name = route.params.name as string;
const owner = route.params.owner as string;

const { data, pending } = useAsyncQuery<{
	repository: {
		id: string;
		object: { entries: RepoFiles };
		refs: { nodes: Ref[] };
		defaultBranchRef: {
			name: string;
			target: Commit;
		};
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

const { mutate: addStar, onError: onErrorAddStar } =
	useMutation(addStarMutation);
const { mutate: removeStar, onError: onErrorRemoveStar } =
	useMutation(removeStarMutation);

onErrorAddStar((err) => {
	isStarChecked.value = false;
	ElNotification({
		title: 'Error',
		message: err.message,
		type: 'error'
	});
});

onErrorRemoveStar((err) => {
	isStarChecked.value = true;
	ElNotification({
		title: 'Error',
		message: err.message,
		type: 'error'
	});
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

const isStarChecked = computed({
	get: () => {
		return !!data?.value?.repository?.stargazers?.nodes?.find(
			(item) => item.login === user.value?.login
		);
	},
	set: (value: boolean) => {
		if (value) {
			data.value = {
				repository: {
					...data.value.repository,
					stargazers: {
						nodes: [
							...data.value.repository.stargazers.nodes,
							{ login: owner }
						]
					}
				}
			};
			addStar({
				repositoryId: data.value.repository.id
			});
		} else {
			data.value = {
				repository: {
					...data.value.repository,
					stargazers: {
						nodes: [
							...data.value.repository.stargazers.nodes
						].filter((node) => node.login !== owner)
					}
				}
			};
			removeStar({
				repositoryId: data.value.repository.id
			});
		}
	}
});

const lastCommit = computed(
	() => data.value?.repository?.defaultBranchRef?.target
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
						@set-star="(e) => (isStarChecked = e)"
					/>
				</template>
			</GlobalPageHeader>
		</template>
		<template #default>
			<RepositoriesContentFileActions
				v-if="!pending && !!refs.length && !!lastCommit?.oid"
			>
				<template #left>
					<RepositoriesElementsRefSelect
						:active-ref="defaultBranchName"
						:refs="refs"
						@change-ref="
							(e) =>
								router.push(
									`/repository/${owner}/${name}/three/${e}`
								)
						"
					/>
				</template>
				<template #right>
					<RepositoriesElementsCommitStatistic
						:commit="lastCommit"
						class="justify-end"
					/>
				</template>
			</RepositoriesContentFileActions>
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
