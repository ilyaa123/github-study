<script setup lang="ts">
import repositoriesQuery from '~/graphql/repositories/file-tree.gql';
import { RepoFileTree } from '~/types/repositories/files';

interface Props {
	name: string;
	path: string;
}

const props = defineProps<Props>();

const route = useRoute();

const result = ref<
	| {
			repository: {
				object: {
					entries: RepoFileTree[];
				};
			};
	  }
	| undefined
>();
const isLoading = ref(false);

const getFiles = () => {
	isLoading.value = true;
	const { onResult, onError } = useQuery<{
		repository: {
			object: { entries: RepoFileTree[] };
		};
	}>(
		repositoriesQuery,
		{
			owner: route.params.owner,
			name: route.params.name,
			expression: `${route.params.ref}:${props.path}`
		},
		{
			fetchPolicy: 'cache-and-network'
		}
	);
	onResult((res) => {
		result.value = res.data;
		isLoading.value = false;
	});
	onError(() => {
		isLoading.value = false;
	});
};

const items = computed(() => result.value?.repository?.object?.entries || []);

onBeforeMount(() => {
	if (
		(route.params.files as string[])?.join('/').includes(props.path) &&
		items.value.length === 0
	) {
		getFiles();
	}
});

const handleMenuSelect = () => {
	if (items.value.length === 0) {
		getFiles();
	}
};
</script>
<template>
	<el-sub-menu :index="path" @click="handleMenuSelect()">
		<template #title>
			<el-icon>
				<Icon
					name="ic:baseline-folder"
					color="var(--el-color-primary)"
				/>
			</el-icon>
			<span>{{ name }}</span>
		</template>
		<el-menu-item v-if="isLoading || items.length == 0">
			<el-icon class="icon-loading">
				<Icon
					name="material-symbols-light:progress-activity"
					color="var(--el-color-primary)"
				/>
			</el-icon>
			<span> Loading... </span>
		</el-menu-item>
		<RepositoriesFilesThreeItem
			v-for="(item, index) in sortFiles([...items])"
			v-else
			:key="index"
			:item="item"
		/>
	</el-sub-menu>
</template>
<style>
.el-progress__text {
	display: none;
}

.icon-loading {
	animation: loader ease-in-out 0.54s infinite;
}

@keyframes loader {
	0% {
		transform: rotate(0);
	}
	50% {
		transform: rotate(180deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
