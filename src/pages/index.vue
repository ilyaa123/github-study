<script setup lang="ts">
import repositoriesQuery from '~/graphql/repositories/list.gql';

import type { RepositoryList } from '~/types/repositories';
import type { Filter } from '~/types/repositories/filter';

definePageMeta({
	backtop: true
});

const route = useRoute();
const router = useRouter();

const filter = reactive<Filter>({
	type: (route.query?.type as Partial<Filter['type']>) || 'PUBLIC',
	sort: (route.query?.sort as Partial<Filter['sort']>) || 'UPDATED_AT'
});

const count = ref<number>(10);
const loadMoreLoading = ref<boolean>(false);

const { result, loading, fetchMore, refetch } = useQuery<RepositoryList>(
	repositoriesQuery,
	{
		limit: count.value,
		privacy: filter?.type || 'PUBLIC',
		sort: filter?.sort || 'UPDATED_AT'
	}
);

const repositories = computed(() => {
	return result.value?.viewer?.repositories.nodes;
});

const hasNextPage = computed(() => {
	return result.value?.viewer.repositories.pageInfo.hasNextPage || false;
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

const loadMore = () => {
	count.value += 10;
	loadMoreLoading.value = true;
	fetchMore({
		variables: {
			limit: count.value,
			privacy: filter?.type || 'PUBLIC',
			sort: filter?.sort || 'UPDATED_AT'
		},
		updateQuery: (previousResult, { fetchMoreResult }) => {
			if (fetchMoreResult?.viewer) {
				return {
					viewer: fetchMoreResult.viewer
				};
			} else {
				return {
					viewer: {
						...previousResult.viewer,
						pageInfo: {
							hasNextPage: false
						}
					}
				};
			}
		}
	})?.then(() => {
		loadMoreLoading.value = false;
	});
};

watch(filter, () => {
	refetch({
		limit: count.value,
		privacy: filter?.type || 'PUBLIC',
		sort: filter?.sort || 'UPDATED_AT'
	});
});

provide('isLoading', loading);
provide('count', count);
provide('hasNextPage', hasNextPage);
provide('loadMoreLoading', loadMoreLoading);
</script>

<template>
	<div>
		<GlobalPageHeader title="Repositories" :is-back="false">
			<template #action>
				<RepositoriesFilter
					:filter="filter"
					@change-filter="changeFilter"
				>
					<el-button
						type="primary"
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
		</GlobalPageHeader>
		<Repositories
			:is-loading="!!loading"
			:count="count"
			:has-next-page="hasNextPage"
			:repositories="repositories"
			@laod-more="loadMore"
		/>
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
