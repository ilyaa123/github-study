<script setup lang="ts">
import type { GetRepositoryItem } from '~/types/repositories';

const props = defineProps<GetRepositoryItem>();
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
