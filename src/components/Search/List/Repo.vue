<script setup lang="ts">
import { RepoResult } from '~/types/search';

interface Props {
	repoItems: { repo: RepoResult }[];
}

defineProps<Props>();

const { setSearchModalOpen } = useDrawers();

const router = useRouter();
</script>
<template>
	<el-menu>
		<template v-for="(item, index) in repoItems" :key="index">
			<el-menu-item
				@click="
					setSearchModalOpen(false),
						router.push(
							`/repository/${item.repo.owner.login}/${item.repo.name}`
						)
				"
			>
				<template #title>
					<el-icon size="large"
						><Icon
							name="eos-icons:repositories"
							color="var(--el-color-primary)"
					/></el-icon>
					<el-text>{{ item.repo.name }}</el-text>
				</template>
			</el-menu-item>
		</template>
	</el-menu>
</template>
