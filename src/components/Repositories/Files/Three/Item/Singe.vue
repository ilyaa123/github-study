<script setup lang="ts">
interface Props {
	name: string;
	path: string;
}

const props = defineProps<Props>();

const route = useRoute();

const router = useRouter();

const handleOnClick = () => {
	const owner = route.params.owner as string;
	const name = route.params.name as string;
	const ref = route.params.ref as string;

	router.push(`/repository/${owner}/${name}/three/${ref}/${props.path}`);
};
</script>
<template>
	<el-menu-item :index="path" @click="handleOnClick">
		<el-icon>
			<Icon
				name="material-symbols:folder-outline-rounded"
				color="var(--el-color-primary)"
			/>
		</el-icon>
		<span>{{ name }}</span>
	</el-menu-item>
</template>
