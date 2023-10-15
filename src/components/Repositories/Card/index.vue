<script setup lang="ts">
interface Props {
	name: string;
	updatedAt: string;
	description: string | null;
	primaryLanguage: {
		color: string;
		name: string;
	} | null;
	forks: { totalCount: number };
	stargazers: { totalCount: number };
}

const props = defineProps<Props>();
</script>
<template>
	<el-card>
		<template #header>
			<RepositoriesCardHeader
				:name="props.name"
				:description="props.description"
				:forks="props.forks"
				:stargazers="props.stargazers"
			/>
		</template>
		<RepositoriesCardContent
			:updated-at="props.updatedAt"
			:primary-language="props.primaryLanguage"
		/>
	</el-card>
</template>
