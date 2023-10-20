<script setup lang="ts">
interface Props {
	title: string;
	isBack?: boolean;
}

interface Emits {
	(event: 'back'): void;
}

const emits = defineEmits<Emits>();

const props = defineProps<Props>();
</script>

<template>
	<el-page-header
		:class="{ 'header-page': true, 'header-non-back': !props?.isBack }"
		@back="emits('back')"
	>
		<template #content>
			<div class="flex items-center">
				<span class="text-large font-600 mr-3">
					{{ props.title }}
				</span>
			</div>
		</template>
		<template #extra>
			<slot name="action" />
		</template>
		<template #default />
	</el-page-header>
</template>
<style lang="css" scoped>
.header-page {
	margin-bottom: 24px;
}
.header-non-back:deep(.el-page-header__back) {
	display: none !important;
}
.header-non-back:deep(.el-divider) {
	display: none !important;
}
</style>
