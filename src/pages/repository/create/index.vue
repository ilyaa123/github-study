<script setup lang="ts">
import { ElMessage } from 'element-plus';

import createRepositoryMutation from '~/graphql/repositories/create.gql';

import type { createRepository } from '~/types/repositories/create';

const router = useRouter();

const { mutate, loading } = useMutation<{
	data: { createRepository: { repository: { name: string } } };
}>(createRepositoryMutation);

const handleOnSuccess = () => {
	ElMessage({
		message: 'Success!',
		type: 'success'
	});
	setTimeout(() => {
		router.push('/');
	}, 1000);
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
		<GlobalPageHeader
			title="Create Repository"
			:is-back="true"
			@back="router.back()"
		/>
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
