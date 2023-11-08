<script setup lang="ts">
interface Props {
	name: string;
	description?: string;
	forks: { totalCount: number };
	stargazers: { totalCount: number; nodes: { login: string }[] };
	owner: {
		login: string;
	};
}

const props = defineProps<Props>();

const { user } = useUser();
</script>

<template>
	<el-row>
		<el-col :span="12">
			<nuxt-link :to="`/repository/${props.owner.login}/${props.name}`">
				<el-text type="primary" size="large">{{ props.name }}</el-text>
			</nuxt-link>
			<div>
				<el-text>{{ props.description }}</el-text>
			</div>
		</el-col>
		<el-col :span="12" class="text-end">
			<span>
				<el-tooltip
					:content="`Stars: ${props.stargazers.totalCount}`"
					placement="top-start"
				>
					<el-badge
						:value="props.stargazers.totalCount"
						type="primary"
						class="mr-4"
					>
						<el-button
							v-if="
								!stargazers.nodes.find(
									(item) => item.login === user?.login
								)
							"
							circle
							text
						>
							<el-icon size="24" color="var(--el-color-warning)">
								<Icon name="octicon:star-24" />
							</el-icon>
						</el-button>
						<el-button v-else circle text>
							<el-icon size="24" color="var(--el-color-warning)">
								<Icon name="octicon:star-fill-24" />
							</el-icon>
						</el-button>
					</el-badge>
				</el-tooltip>
				<el-tooltip
					:content="`Forks: ${props.forks.totalCount}`"
					placement="top-start"
				>
					<el-badge :value="props.forks.totalCount">
						<el-button circle text>
							<el-icon size="24">
								<Icon name="ion:ios-git-branch" />
							</el-icon>
						</el-button>
					</el-badge>
				</el-tooltip>
			</span>
		</el-col>
	</el-row>
</template>
