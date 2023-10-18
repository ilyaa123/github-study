<script setup lang="ts">
import type { GetRepositoryItem } from '~/types/repositories';

interface Props {
	isLoading: boolean;
	repositories?: GetRepositoryItem[];
}

const props = defineProps<Props>();
</script>
<template>
	<RepositoriesSkeletonLayout :is-loading="props.isLoading" :count="10">
		<el-row
			v-for="(repositoriy, index) in props?.repositories"
			:key="repositoriy.id"
			:span="6"
			:offset="index % 3 !== 0 ? 1 : 0"
			class="mb-2"
		>
			<RepositoriesCard
				:id="repositoriy.id"
				class="w-100%"
				:name="repositoriy.name"
				:updated-at="repositoriy.updatedAt"
				:description="repositoriy.description"
				:primary-language="repositoriy.primaryLanguage"
				:forks="repositoriy.forks"
				:stargazers="repositoriy.stargazers"
			/>
		</el-row>
	</RepositoriesSkeletonLayout>
</template>
