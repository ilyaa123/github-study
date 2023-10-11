<script lang="ts" setup>
interface Props {
	guard: boolean;
}

const props = defineProps<Props>();

const router = useRouter();

const { getToken } = useApollo();

const token = getToken();

const isAutentificated = computed(() => {
	return !!token;
});

watch(
	() => props.guard,
	() => {
		if (!props.guard && isAutentificated.value) {
			router.push('/');
		}
	}
);

onMounted(() => {
	if (!props.guard && isAutentificated.value) {
		router.push('/');
	}
});
</script>
<template>
	<GuardNotAutorized v-if="props.guard && !isAutentificated" />
	<div v-else>
		<slot />
	</div>
</template>
