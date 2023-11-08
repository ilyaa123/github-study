<script setup lang="ts">
interface Props {
	text: string;
}

interface Emits {
	(event: 'success'): void;
	(event: 'error'): void;
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

const handleOnCopy = () => {
	navigator.clipboard
		.writeText(props.text)
		.then(() => {
			emits('success');
		})
		.catch(() => {
			emits('error');
		});
};
</script>
<template>
	<el-text v-bind="$attrs">
		<el-row class="text-right">
			<el-col :span="24">
				<el-tooltip effect="dark" content="Copy" placement="top">
					<el-button circle text @click="handleOnCopy">
						<el-icon size="24" color="var(--el-color-primary)">
							<Icon
								name="material-symbols:content-copy-outline"
							/>
						</el-icon>
					</el-button>
				</el-tooltip>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<slot />
			</el-col>
		</el-row>
	</el-text>
</template>
<style scoped></style>
