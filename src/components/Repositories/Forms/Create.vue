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
	visibility: { required: true, message: 'Visibility is required!' },
	template: { required: true, message: 'Template is required!' },
	hasWikiEnabled: { required: true, message: 'Wiki is required!' },
	hasIssuesEnabled: { required: true, message: 'Issues is required!' }
});

const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			emits('create', createRepositoryForm);
		}
	});
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
		<el-form-item label="Description">
			<el-input
				v-model="createRepositoryForm.description"
				type="textarea"
			/>
		</el-form-item>
		<el-form-item label="Visibility">
			<el-radio-group v-model="createRepositoryForm.visibility">
				<el-radio-button label="PUBLIC" name="Public" />
				<el-radio-button label="PRIVATE" name="Private" />
			</el-radio-group>
		</el-form-item>
		<el-form-item label="Template">
			<el-switch v-model="createRepositoryForm.template" />
		</el-form-item>
		<el-form-item label="Homepage URL">
			<el-input v-model="createRepositoryForm.homepageUrl" />
		</el-form-item>
		<el-form-item label="Issues Enebled">
			<el-switch v-model="createRepositoryForm.hasIssuesEnabled" />
		</el-form-item>
		<el-form-item label="Wiki Enebled">
			<el-switch v-model="createRepositoryForm.hasWikiEnabled" />
		</el-form-item>
		<el-form-item>
			<el-button
				type="primary"
				:loading="props.isLoading"
				@click="submitForm(formRef)"
				>Create</el-button
			>
			<el-button>Cancel</el-button>
		</el-form-item>
	</el-form>
</template>
