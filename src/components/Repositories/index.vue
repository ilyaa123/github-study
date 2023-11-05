<script setup lang="ts">
import type { GetRepositoryItem } from '~/types/repositories';

interface Props {
	isLoading: boolean;
	count: number;
	hasNextPage?: boolean;
	repositories?: GetRepositoryItem[];
}

interface Emits {
	(event: 'laodMore'): void;
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();
</script>
<template>
	<RepositoriesSkeletonLayout @laod-more="emits('laodMore')">
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
				:owner="repositoriy.owner"
				:updated-at="repositoriy.updatedAt"
				:description="repositoriy.description"
				:primary-language="repositoriy.primaryLanguage"
				:forks="repositoriy.forks"
				:stargazers="repositoriy.stargazers"
			/>
		</el-row>
		<RepositoriesEmpty v-if="!repositories?.length" />
	</RepositoriesSkeletonLayout>
</template>
