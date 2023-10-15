<script setup lang="ts">
interface Props {
	isLoading: boolean;
	repositories?: {
		id: string;
		name: string;
		updatedAt: string;
		description: string | null;
		primaryLanguage: {
			color: string;
			name: string;
		} | null;
		forks: { totalCount: number };
		stargazers: { totalCount: number };
	}[];
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
