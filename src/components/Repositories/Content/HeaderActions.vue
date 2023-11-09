<script setup lang="ts">
interface Props {
	isStarChecked: boolean;
}

defineProps<Props>();
</script>
<template>
	<el-space wrap>
		<el-button
			><el-icon size="24" color="var(--el-color-primary)">
				<Icon name="material-symbols:push-pin-outline" /> </el-icon
			>Pin</el-button
		>
		<el-button>
			<el-icon size="24" color="var(--el-color-primary)">
				<Icon name="fluent:branch-fork-24-regular" /> </el-icon
			>Fork</el-button
		>
		<el-button :type="!isStarChecked ? '' : 'primary'">
			<el-icon
				size="24"
				:color="
					!isStarChecked
						? 'var(--el-color-primary)'
						: 'var(--el-color-white)'
				"
			>
				<Icon name="ic:outline-star-border" />
			</el-icon>
			Star
		</el-button>
	</el-space>
</template>
