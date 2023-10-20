<script setup lang="ts">
const route = useRoute();

const authGuard = computed(() =>
	typeof route.meta?.authGuard === 'boolean' ? route.meta?.authGuard : true
);
</script>
<template>
	<GuardAuth :guard="authGuard">
		<NuxtLayout>
			<nuxt-loading-indicator
				:throttle="0"
				color="var(--el-color-primary)"
			/>
			<NuxtPage />
		</NuxtLayout>
	</GuardAuth>
</template>
<style lang="scss">
.page-enter-active,
.page-leave-active {
	transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
	filter: blur(1rem);
}
.layout-enter-active,
.layout-leave-active {
	transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
	filter: grayscale(1);
}
</style>
