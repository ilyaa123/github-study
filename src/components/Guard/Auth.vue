<script lang="ts" setup>
interface Props {
	guard: boolean;
}

const props = defineProps<Props>();

const router = useRouter();

const token = useCookie('gitToken');

const { getUser, isAuth } = useUser();

const checkedAuth = () => {
	if (!props.guard && !!isAuth.value) {
		router.push('/');
	}
};

const getUserAuth = () => {
	getUser();
};

watch(
	() => props.guard,
	() => {
		checkedAuth();
	}
);

onMounted(() => {
	checkedAuth();

	if (token.value) {
		getUserAuth();
	}
});
</script>
<template>
	<GuardNotAutorized v-if="props.guard && !isAuth && router.listening" />
	<div v-else>
		<slot />
	</div>
</template>
