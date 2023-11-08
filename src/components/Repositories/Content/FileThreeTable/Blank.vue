<script setup lang="ts">
import { ElNotification } from 'element-plus';

interface Props {
	owner: string;
	name: string;
}

const props = defineProps<Props>();

const method = ref<'https' | 'ssh'>('https');

const link = computed(() => {
	return `${method.value === 'https' ? 'https://' : 'git@'} github.com/${
		props.owner
	}/${props.name}.git`;
});

const command1 = computed(
	() => `echo "# ${props.name}" >> README.md \n
git init \n
git add README.md \n
git commit -m "first commit"
git branch -M main \n
git remote add origin ${link.value}
`
);

const command2 = computed(
	() => `git remote add origin ${link.value} \n
git branch -M main \n
git push -u origin main \n
`
);

const handleOnSuccesCopy = () => {
	ElNotification.success({
		title: 'Copy success!',
		position: 'bottom-right',
		showClose: false
	});
};

const handleOnErrorCopy = () => {
	ElNotification.error({
		title: 'Failed to copy :(',
		position: 'bottom-right',
		showClose: false
	});
};
</script>
<template>
	<el-empty description="No Repository Data">
		<el-space direction="vertical" class="w-100% space" fill>
			<el-radio-group v-model="method" size="large">
				<el-radio-button label="https" name="Https" />
				<el-radio-button label="ssh" name="Ssh" />
			</el-radio-group>
			<el-row :gutter="20" class="w-100%">
				<el-col :span="12">
					<el-card class="box-card w-100%">
						<template #header>
							<el-text size="large"
								>Create a new repository on the command
								line</el-text
							>
						</template>
						<GlobalCopyCard
							size="large"
							type="info"
							:text="command1"
							@success="handleOnSuccesCopy"
							@error="handleOnErrorCopy"
						>
							<pre class="text-left">{{ command1 }}</pre>
						</GlobalCopyCard>
					</el-card>
				</el-col>
				<el-col :span="12">
					<el-card class="box-card w-100%">
						<template #header>
							<el-text size="large"
								>or Push an existing repository from the command
								line</el-text
							>
						</template>
						<GlobalCopyCard
							size="large"
							type="info"
							:text="command2"
							@success="handleOnSuccesCopy"
							@error="handleOnErrorCopy"
						>
							<pre class="text-left">{{ command2 }}</pre>
						</GlobalCopyCard>
					</el-card>
				</el-col>
			</el-row>
		</el-space>
	</el-empty>
</template>
<style scoped>
.el-empty__bottom {
	width: 100%;
}
.space {
	align-items: flex-start !important;
}
</style>
