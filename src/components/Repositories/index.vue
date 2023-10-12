<script setup lang="ts">
interface Props {
	isLoading: boolean;
	repositories: {
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
	<el-row
		v-for="(repositoriy, index) in props.repositories"
		:span="6"
		:offset="index % 3 !== 0 ? 1 : 0"
		:key="repositoriy.id"
		class="mb-2"
	>
		<RepositoriesCard
			class="w-100%"
			:name="repositoriy.name"
			:updatedAt="repositoriy.updatedAt"
			:description="repositoriy.description"
			:primaryLanguage="repositoriy.primaryLanguage"
			:forks="repositoriy.forks"
			:stargazers="repositoriy.stargazers"
		/>
	</el-row>
</template>
