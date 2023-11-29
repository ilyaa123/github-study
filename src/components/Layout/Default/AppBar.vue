<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';

interface IQueryFewUser {
	viewer: {
		avatarUrl: string;
	};
}

const queryFewUser = gql`
	query {
		viewer {
			avatarUrl
		}
	}
`;

const { setProfileAsideOpen, setSearchModalOpen } = useDrawers();

const { data } = await useAsyncQuery<IQueryFewUser>(queryFewUser);
</script>

<template>
	<el-row style="height: 100%; justify-content: space-between">
		<el-col :span="12" :md="4">
			<el-text class="mx-1" style="color: var(--el-color-white)"
				><NuxtLink to="/" style="color: inherit"
					><h2>GitHub Study</h2></NuxtLink
				></el-text
			>
		</el-col>
		<el-col :span="12" :md="8" style="text-align: right">
			<el-row
				class="items-center"
				style="
					height: 100%;
					flex-wrap: nowrap;
					justify-content: flex-end;
					gap: 10px;
				"
			>
				<el-input
					placeholder="Search"
					style="max-width: 300px"
					size="large"
					:suffix-icon="Search"
					@click="setSearchModalOpen(true)"
				/>
				<div
					class="toolbar__profile"
					@click="setProfileAsideOpen(true)"
				>
					<el-avatar shape="square" :src="data?.viewer?.avatarUrl" />
				</div>
			</el-row>
		</el-col>
	</el-row>
</template>
<style lang="scss" scoped>
.toolbar {
	&__profile {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		right: 20px;
		font-size: 12px;
		cursor: pointer;
	}
}
</style>
