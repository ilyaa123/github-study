<script setup lang="ts">
import { ElMessage } from 'element-plus';

import createRepositoryMutation from '~/graphql/repositories/create.gql';

import type { createRepository } from '~/types/repositories/create';

const router = useRouter();

const { mutate, loading } = useMutation<{
	data: { createRepository: { repository: { name: string } } };
}>(createRepositoryMutation);

const handleOnSuccess = () => {
	router.push('/');
	ElMessage({
		message: 'Success!',
		type: 'success'
	});
};

const handleOnError = (message: string) => {
	ElMessage.error(message);
};

const handleOnCreateRepository = (form: createRepository) => {
	mutate(form)
		.then(handleOnSuccess)
		.catch((err) => handleOnError(err));
};
</script>

<template>
	<div>
		<el-page-header class="header-page" @back="router.back()">
			<template #content>
				<div class="flex items-center">
					<span class="text-large font-600 mr-3">
						Create Repository
					</span>
				</div>
			</template>
			<template #default />
		</el-page-header>
		<div class="form-container">
			<RepositoriesFormsCreate
				:is-loading="loading"
				@create="handleOnCreateRepository"
			/>
		</div>
	</div>
</template>
<style lang="css" scoped>
.header-page {
	margin-bottom: 16px;
}
.form-container {
	max-width: 900px;
	margin: 0 auto;
}
</style>
