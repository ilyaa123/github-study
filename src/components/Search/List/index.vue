<script setup lang="ts">
import { RepoResult, UserResult, IssueResult } from '~/types/search';

interface Props {
	repoItems: { repo: RepoResult }[];
	userItems: { user: UserResult }[];
	issueItems: { issue: IssueResult }[];
	isLoading: boolean;
}

defineProps<Props>();
</script>
<template>
	<el-col v-loading="isLoading" :span="24">
		<template
			v-if="
				repoItems.length > 0 &&
				!!repoItems.every((item) => !!item?.repo?.id)
			"
		>
			<SearchListRepo :repo-items="repoItems" />
		</template>
		<template
			v-else-if="
				userItems.length > 0 &&
				!!userItems.every((item) => item?.user?.id)
			"
		>
			<SearchListUser :user-items="userItems" />
		</template>
		<template
			v-else-if="
				issueItems.length > 0 &&
				!!issueItems.every((item) => item?.issue?.id)
			"
		>
			<SearchListIssue :issue-items="issueItems" />
		</template>

		<el-empty v-else :image-size="200" />
	</el-col>
</template>
