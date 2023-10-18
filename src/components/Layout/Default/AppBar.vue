<script setup lang="ts">
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

const { data } = await useAsyncQuery<IQueryFewUser>(queryFewUser);
</script>

<template>
	<el-row style="height: 100%; justify-content: space-between">
		<el-col :span="4">
			<el-text class="mx-1" style="color: var(--el-color-white)"
				><NuxtLink to="/" style="color: inherit"
					><h2>GitHub Study</h2></NuxtLink
				></el-text
			>
		</el-col>
		<el-col :span="4" style="text-align: right">
			<div class="toolbar__profile">
				<NuxtLink to="/profile/">
					<el-avatar shape="square" :src="data?.viewer?.avatarUrl" />
				</NuxtLink>
			</div>
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
		// text-align: right;
		font-size: 12px;
	}
}
</style>
