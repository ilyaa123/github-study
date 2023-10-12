<script lang="ts" setup>
interface Props {
	guard: boolean;
}

const props = defineProps<Props>();

const router = useRouter();

const token = useCookie('gitToken');

const isAutentificated = computed(() => {
	return !!token.value;
});

const checkedAuth = () => {
	if (!props.guard && !!isAutentificated.value) {
		router.push('/');
	}
};

watch(
	() => props.guard,
	() => {
		checkedAuth();
	}
);

onMounted(() => {
	checkedAuth();
});
</script>
<template>
	<GuardNotAutorized v-if="props.guard && !isAutentificated" />
	<div v-else>
		<slot />
	</div>
</template>
