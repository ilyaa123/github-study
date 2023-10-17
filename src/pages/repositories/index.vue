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
		path: '/repositories',
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
		<h1>Repositories</h1>
		<RepositoriesFilter :filter="filter" @change-filter="changeFilter">
			<Repositories
				:is-loading="!!loading"
				:repositories="repositories"
			/>
		</RepositoriesFilter>
	</div>
</template>
