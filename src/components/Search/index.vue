<script setup lang="ts">
import searchQuery from '~/graphql/search.gql';

import { SearchRepoResult } from '~/types/search';

const trottle = useThrottle(450);

const limit = ref<number>(10);
const value = ref<string>('');
const searchType = ref<'REPOSITORY' | 'USER' | 'ISSUE'>('REPOSITORY');
const isMoreLoading = ref<boolean>(false);

const { result, loading, refetch } = useQuery<{
	search: SearchRepoResult;
}>(searchQuery, {
	limit: limit.value,
	type: searchType.value,
	query: value.value
});

const repoList = computed(() => result.value?.search?.repos || []);

const userList = computed(() => result.value?.search?.users || []);

const issueList = computed(() => result.value?.search?.issues || []);

const hasNextPage = computed(
	() => !!result.value?.search?.pageInfo?.hasNextPage
);

watch(value, () => {
	trottle(() => {
		refetch({
			limit: limit.value,
			type: searchType.value,
			query: value.value
		});
	});
});

watch(searchType, () => {
	refetch({
		limit: limit.value,
		type: searchType.value,
		query: value.value
	});
});

const hanleOnLoadMore = () => {
	isMoreLoading.value = true;
	limit.value += 10;
	refetch({
		limit: limit.value,
		type: searchType.value,
		query: value.value
	})?.finally(() => (isMoreLoading.value = false));
};
</script>
<template>
	<div>
		<el-row class="mb-3">
			<SearchInput
				v-model="value"
				:search-type-value="searchType"
				@update:search-type-value="
					(value: 'REPOSITORY' | 'USER' | 'ISSUE') =>
						(searchType = value)
				"
			/>
		</el-row>
		<el-divider class="mb-3" />
		<el-row>
			<SearchList
				:repo-items="repoList"
				:user-items="userList"
				:issue-items="issueList"
				:is-loading="loading && !isMoreLoading"
			/>
		</el-row>
		<el-row v-if="hasNextPage" class="mt-4">
			<el-col :span="24" class="text-center">
				<el-button
					size="small"
					:loading="isMoreLoading"
					@click="hanleOnLoadMore"
					>Load more</el-button
				>
			</el-col>
		</el-row>
	</div>
</template>
