<script setup lang="ts">
import type { GetRepositoryItem } from '~/types/repositories';

interface Props {
	isLoading: boolean;
	count: number;
	limit?: number;
	repositories?: GetRepositoryItem[];
}

interface Emits {
	(event: 'laodMore'): void;
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();
</script>
<template>
	<RepositoriesSkeletonLayout :is-loading="props.isLoading" :count="count">
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
		<el-row
			v-if="
				!!props.limit &&
				props?.repositories &&
				props?.repositories?.length < props.limit
			"
			class="py-4"
		>
			<el-col
				:span="24"
				class="flex"
				style="justify-content: center; align-items: center"
			>
				<el-button type="primary" @click="emits('laodMore')"
					>Load More</el-button
				>
			</el-col>
		</el-row>
	</RepositoriesSkeletonLayout>
</template>
