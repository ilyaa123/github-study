<script setup lang="ts">
interface Props {
	name: string;
	updatedAt: string;
	description: string | null;
	primaryLanguage: {
		color: string;
		name: string;
	} | null;
	forks: { totalCount: number };
	stargazers: { totalCount: number };
}

const props = defineProps<Props>();
</script>
<template>
	<el-card>
		<template #header>
			<el-row>
				<el-col :span="12">
					<el-text type="primary" size="large">{{
						props.name
					}}</el-text>
					<div>
						<el-text>{{ props.description }}</el-text>
					</div>
				</el-col>
				<el-col :span="12" class="text-end">
					<span>
						<el-badge
							:value="props.stargazers.totalCount"
							type="primary"
							class="mr-4"
						>
							<el-icon size="24" color="var(--el-color-warning)">
								<Icon name="ph:star-four-bold" />
							</el-icon>
						</el-badge>
						<el-badge :value="props.forks.totalCount">
							<el-icon size="24">
								<Icon name="ion:ios-git-branch" />
							</el-icon>
						</el-badge>
					</span>
				</el-col>
			</el-row>
		</template>
		<el-row>
			<el-col :span="12">
				<el-text v-if="!!primaryLanguage" size="small">
					<el-row class="items-center">
						<div
							class="w-5 h-5 mr-1"
							:style="{
								backgroundColor: primaryLanguage?.color,
								borderRadius: '50%'
							}"
						></div>
						{{ props.primaryLanguage?.name }}
					</el-row>
				</el-text>
			</el-col>
			<el-col :span="12" class="text-end">
				<el-text>Updated At: {{ props.updatedAt }}</el-text>
			</el-col>
		</el-row>
	</el-card>
</template>
