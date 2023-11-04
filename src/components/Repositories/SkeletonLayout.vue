<script setup lang="ts">
interface Emits {
	(event: 'laodMore'): void;
}
const emits = defineEmits<Emits>();

const isLoading = inject('isLoading', true);

const count = inject('count', 10);

const hasNextPage = inject('hasNextPage', false);
</script>
<template>
	<el-skeleton animated :loading="isLoading && !hasNextPage" :count="count">
		<template #template>
			<el-skeleton-item
				class="mb-2"
				variant="text"
				style="height: 100px"
			/>
		</template>
		<template #default>
			<slot />
			<el-row v-if="hasNextPage" class="py-4">
				<el-col
					:span="24"
					class="flex"
					style="justify-content: center; align-items: center"
				>
					<el-button
						type="primary"
						:loading="isLoading"
						@click="emits('laodMore')"
						>Load More</el-button
					>
				</el-col>
			</el-row>
		</template>
	</el-skeleton>
</template>
