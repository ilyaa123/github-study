<script setup lang="ts">
import repositoriesQuery from '~/graphql/repositories.gql';

const route = useRoute();
const router = useRouter();

const filter = reactive({
	type: route.query.type || 'PUBLIC',
	sort: route.query.sort || 'UPDATED_AT'
});

const count = ref<number>(8);

const { result, loading, refetch } = useQuery(repositoriesQuery, {
	limit: count.value,
	privacy: filter?.type || 'PUBLIC',
	sort: filter?.sort || 'UPDATED_AT'
});

const repositories = computed(() => {
	return result.value?.viewer?.repositories.nodes;
});

const changeFilter = (filter: { type: string; sort: string }) => {
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
