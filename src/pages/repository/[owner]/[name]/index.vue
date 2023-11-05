<script setup lang="ts">
import repositoriesQuery from '~/graphql/repositories/files.gql';
import { RepoFiles } from '~/types/repositories/files';

const route = useRoute();
const router = useRouter();

const name = route.params.name as string;
const owner = route.params.owner as string;

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
		<RepositoriesContentFileThreeTable :files="files" />
	</RepositoriesContentLayout>
</template>
