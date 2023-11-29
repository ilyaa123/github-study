<script setup lang="ts">
import { UserResult } from '~/types/search';

interface Props {
	userItems: { user: UserResult }[];
}

defineProps<Props>();
</script>
<template>
	<el-menu>
		<template v-for="(item, index) in userItems" :key="index">
			<el-menu-item>
				<template #title>
					<el-avatar :src="item.user.avatarUrl" class="mr-2" />
					<el-text type="primary">{{
						item.user?.name || item.user.login
					}}</el-text>
				</template>
			</el-menu-item>
		</template>
	</el-menu>
</template>
