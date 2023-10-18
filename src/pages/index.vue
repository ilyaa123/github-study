<script setup lang="ts">
import repositoriesQuery from '~/graphql/repositories/get.gql';

import type { GetRepositoryItem } from '~/types/repositories';
import type { Filter } from '~/types/repositories/filter';

const route = useRoute();
const router = useRouter();

const filter = reactive<Filter>({
	type: (route.query?.type as Partial<Filter['type']>) || 'PUBLIC',
	sort: (route.query?.sort as Partial<Filter['sort']>) || 'UPDATED_AT'
});

const count = ref<number>(100);

const { result, loading, refetch } = useQuery<{
	viewer: { repositories: { nodes: GetRepositoryItem[] } };
}>(repositoriesQuery, {
	limit: count.value,
	privacy: filter?.type || 'PUBLIC',
	sort: filter?.sort || 'UPDATED_AT'
});

const repositories = computed(() => {
	return result.value?.viewer?.repositories.nodes;
});

const changeFilter = (filter: Filter) => {
	router.push({
		path: '/',
		query: {
			type: filter.type,
			sort: filter.sort
		}
	});
};

watch(filter, () => {
	refetch({
		limit: count.value,
		privacy: filter?.type || 'PUBLIC',
		sort: filter?.sort || 'UPDATED_AT'
	});
});
</script>

<template>
	<div>
		<el-page-header class="header-page" :icon="''" content="mb-4">
			<template #content>
				<div class="flex items-center">
					<span class="text-large font-600 mr-3"> Repositories </span>
				</div>
			</template>
			<template #extra>
				<RepositoriesFilter
					:filter="filter"
					@change-filter="changeFilter"
				>
					<el-button
						type="primary"
						class="ml-1"
						style="height: auto"
						@click="router.push('/repository/create')"
					>
						<el-icon size="large">
							<Icon name="ic:round-plus" />
						</el-icon>
						Add
					</el-button>
				</RepositoriesFilter>
			</template>
			<template #default />
		</el-page-header>
		<Repositories :is-loading="!!loading" :repositories="repositories" />
	</div>
</template>
<style lang="css" scoped>
.header-page {
	margin-bottom: 24px;
}
.header-page:deep(.el-page-header__back) {
	display: none !important;
}
.header-page:deep(.el-divider) {
	display: none !important;
}
</style>
