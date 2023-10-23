<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';

import type { createRepository } from '~/types/repositories/create';

interface Emits {
	(event: 'create', form: createRepository): void;
}

const emits = defineEmits<Emits>();

const props = defineProps({
	isLoading: {
		required: true,
		type: Boolean
	}
});

const formRef = ref<FormInstance>();

const createRepositoryForm = reactive<createRepository>({
	name: '',
	description: '',
	visibility: 'PUBLIC',
	template: false,
	homepageUrl: '',
	hasWikiEnabled: false,
	hasIssuesEnabled: false
});

const rules = reactive<FormRules<typeof createRepositoryForm>>({
	name: [{ required: true, message: 'Name is required!', trigger: 'change' }],
	visibility: { required: true, message: 'Visibility is required!' }
});

const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			emits('create', createRepositoryForm);
		}
	});
};

const hanldeOnResetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};
</script>

<template>
	<el-form
		ref="formRef"
		:model="createRepositoryForm"
		:rules="rules"
		label-width="140px"
		status-icon
		label-position="right"
	>
		<el-form-item label="Repository name" prop="name">
			<el-input v-model="createRepositoryForm.name" />
		</el-form-item>
		<el-form-item label="Description" prop="description">
			<el-input
				v-model="createRepositoryForm.description"
				type="textarea"
			/>
		</el-form-item>
		<el-form-item label="Visibility" prop="visibility">
			<el-radio-group v-model="createRepositoryForm.visibility">
				<el-radio-button label="PUBLIC" name="Public" />
				<el-radio-button label="PRIVATE" name="Private" />
			</el-radio-group>
		</el-form-item>
		<el-form-item label="Template" prop="template">
			<el-switch v-model="createRepositoryForm.template" />
		</el-form-item>
		<el-form-item label="Homepage URL" prop="homepageUrl">
			<el-input v-model="createRepositoryForm.homepageUrl" />
		</el-form-item>
		<el-form-item label="Issues Enebled" prop="hasIssuesEnabled">
			<el-switch v-model="createRepositoryForm.hasIssuesEnabled" />
		</el-form-item>
		<el-form-item label="Wiki Enebled" prop="hasWikiEnabled">
			<el-switch v-model="createRepositoryForm.hasWikiEnabled" />
		</el-form-item>
		<el-form-item>
			<el-button
				type="primary"
				:loading="props.isLoading"
				@click="submitForm(formRef)"
				>CREATE</el-button
			>
			<el-button @click="hanldeOnResetForm(formRef)">RESET</el-button>
		</el-form-item>
	</el-form>
</template>
