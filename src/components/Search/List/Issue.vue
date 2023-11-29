<script setup lang="ts">
import { IssueResult } from '~/types/search';

interface Props {
	issueItems: { issue: IssueResult }[];
}

defineProps<Props>();
</script>
<template>
	<el-menu>
		<template v-for="(item, index) in issueItems" :key="index">
			<el-menu-item>
				<template #title>
					<div>
						<el-avatar
							:src="item.issue.author.avatarUrl"
							class="mr-2"
						/>
						<el-text type="primary">{{
							item.issue.author.login
						}}</el-text>
					</div>
					<el-text size="large">{{ item.issue.title }}</el-text>
				</template>
			</el-menu-item>
		</template>
	</el-menu>
</template>
