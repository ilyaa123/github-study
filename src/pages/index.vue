<script setup lang="ts">
import repositoriesQuery from '~/graphql/repositories/list.gql';

import type { GetRepositoryItem } from '~/types/repositories';
import type { Filter } from '~/types/repositories/filter';

const route = useRoute();
const router = useRouter();

const filter = reactive<Filter>({
	type: (route.query?.type as Partial<Filter['type']>) || 'PUBLIC',
	sort: (route.query?.sort as Partial<Filter['sort']>) || 'UPDATED_AT'
});

const count = ref<number>(100);

const { result, loading, fetchMore, refetch } = useQuery<{
	viewer: {
		repositories: { totalCount: number; nodes: GetRepositoryItem[] };
	};
}>(
	repositoriesQuery,
	{
		limit: count.value,
		privacy: filter?.type || 'PUBLIC',
		sort: filter?.sort || 'UPDATED_AT'
	},
	{
		prefetch: false
	}
);

onMounted(() => {
	refetch();
});

const repositories = computed(() => {
	return result.value?.viewer?.repositories.nodes;
});

const limit = computed(() => {
	return result.value?.viewer.repositories.totalCount;
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
	console.log('test');
	fetchMore(repositoriesQuery);
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
		<GlobalPageHeader title="Repositories" :is-back="false">
			<template #action>
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
		</GlobalPageHeader>
		<Repositories
			:is-loading="!!loading"
			:count="count"
			:limit="limit"
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
