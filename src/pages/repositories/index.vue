<script setup lang="ts">
import repositoriesQuery from '~/graphql/repositories.gql';

const count = ref<number>(8);

const { result, loading } = useQuery(repositoriesQuery, {
	limit: count.value
});

const repositories = computed(() => {
	return result.value?.viewer.repositories.nodes;
});
</script>

<template>
	<div>
		<h1>Repositories</h1>
		<RepositoriesFilter>
			<Repositories
				:is-loading="!!loading.value"
				:repositories="repositories"
			/>
		</RepositoriesFilter>
	</div>
</template>
